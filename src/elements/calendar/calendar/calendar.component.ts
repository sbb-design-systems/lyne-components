import {
  type CSSResultGroup,
  html,
  isServer,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbSecondaryButtonElement } from '../../button.pure.ts';
import {
  buttonResetStyles,
  type DateAdapter,
  defaultDateAdapter,
  forceType,
  type FormRestoreReason,
  type FormRestoreState,
  handleDistinctChange,
  i18nCalendarDateSelection,
  i18nCalendarWeekNumber,
  i18nNextMonth,
  i18nNextYear,
  i18nNextYearRange,
  i18nPreviousMonth,
  i18nPreviousYear,
  i18nPreviousYearRange,
  i18nYearMonthSelection,
  isArrowKeyOrPageKeysPressed,
  MONDAY,
  plainDate,
  readConfig,
  SbbElement,
  type SbbElementType,
  SbbFormAssociatedMixin,
  SbbLanguageController,
  screenReaderOnlyStyles,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
} from '../../core.ts';
import { SbbIconElement } from '../../icon.pure.ts';
import { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';
import { SbbCalendarMonthElement } from '../calendar-month/calendar-month.component.ts';
import { SbbCalendarWeekdayElement } from '../calendar-weekday/calendar-weekday.component.ts';
import { SbbCalendarWeeknumberElement } from '../calendar-weeknumber/calendar-weeknumber.component.ts';
import { SbbCalendarYearElement } from '../calendar-year/calendar-year.component.ts';
import type { SbbCalendarCellBaseElement } from '../common/calendar-cell-base-element.ts';

import style from './calendar.scss?inline';

const DAYS_PER_ROW: number = 7;
const MONTHS_PER_ROW: number = 4;
const YEARS_PER_ROW: number = 4;
const MONTHS_PER_PAGE: number = 12;
const YEARS_PER_PAGE: number = 24;

export class SbbMonthChangeEvent<T = Date> extends Event {
  private readonly _range: readonly Day<T>[];

  public get range(): readonly Day<T>[] {
    return this._range;
  }

  public constructor(range: readonly Day<T>[]) {
    super('monthchange', { bubbles: true, composed: true });
    this._range = Object.freeze(range || []);
  }
}

export class SbbDateSelectedEvent<T> extends Event {
  private readonly _dateSelected: Readonly<T | T[]>;

  public get dateSelected(): Readonly<T | T[]> {
    return this._dateSelected;
  }

  public constructor(dates: T | T[]) {
    super('dateselected', { bubbles: true, composed: true });
    this._dateSelected = Object.freeze(dates);
  }
}

/**
 * Parameters needed in year and month views to correctly calculate the next element in keyboard navigation.
 *
 * The cell's index and the element's index in its month / year batch must be distinguished:
 * the first is the index of the element in the array of all the rendered cells, while the second is the index of the element relative to its table.
 * In non-wide mode, the wto are the same, while in wide mode the cell's index can go from 0 to 47 for years and from 0 to 23 for months,
 * while the element index goes from 0 to, respectively, 23 and 11.
 */
interface CalendarKeyboardNavigationMonthYearViewsParameters {
  /** The element index within its year or month range. */
  elementIndexForWideMode: number;
  /** In wide mode, the index of the first element in the second panel, or, alternatively, the number of elements in the first panel. */
  offsetForWideMode: number;
  /** The index of the last element within the element's month (or year range). */
  lastElementIndexForWideMode: number;
  /** The number of cells displayed in a single row, depending on the rendered view. */
  verticalOffset: number;
}

export interface Day<T = Date> {
  /** Date as ISO string. */
  value: string;
  dayValue: string;
  monthValue: string;
  yearValue: string;
  dateValue: T;
  weekValue: number;
  weekDayValue: number;
}

export interface MonthCell {
  value: string;
  monthValue: number;
}

export interface Weekday {
  long: string;
  narrow: string;
}

/**
 * It displays a calendar which allows choosing a date.
 *
 * @slot - Use the unnamed slot to add customized `sbb-calendar-day` elements.
 */
export class SbbCalendarElement<T = Date> extends SbbFormAssociatedMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-calendar';
  public static override elementDependencies: SbbElementType[] = [
    SbbCalendarDayElement,
    SbbCalendarMonthElement,
    SbbCalendarWeekdayElement,
    SbbCalendarWeeknumberElement,
    SbbCalendarYearElement,
    SbbIconElement,
    SbbSecondaryButtonElement,
  ];
  public static override styles: CSSResultGroup = [
    buttonResetStyles,
    screenReaderOnlyStyles,
    unsafeCSS(style),
  ];
  public static readonly events = {
    dateselected: 'dateselected',
    monthchange: 'monthchange',
  } as const;

  /**
   * The amount of months to display in this calendar.
   */
  @forceType()
  @property({ type: Number })
  public accessor amount: number = 1;

  /** The initial view of the calendar which should be displayed on opening. */
  @property() public accessor view: 'day' | 'month' | 'year' = 'day';

  /**
   * The minimum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @plainDate()
  @property()
  public accessor min: T | null = null;

  /**
   * The maximum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @plainDate()
  @property()
  public accessor max: T | null = null;

  /** Whether the calendar allows for multiple date selection. */
  @forceType()
  @handleDistinctChange((e: SbbCalendarElement<T>, newValue: boolean) =>
    e._onMultipleChanged(newValue),
  )
  @property({ type: Boolean })
  public accessor multiple: boolean = false;

  /**
   * The selected date: accepts a date object, or, if `multiple`, an array of dates.
   */
  @property()
  public set value(value: T | T[] | null) {
    if (Array.isArray(value)) {
      this._value = value
        .map((dateLike: T) =>
          this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(dateLike)),
        )
        .filter((date: T | null): date is T => date !== null)
        .filter(
          (date: T) =>
            !this._isDayInRange(this._dateAdapter.toIso8601(date)) || this._dateFilter(date),
        )
        .sort(this._sortDate);
    } else {
      const selectedDate = this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value),
      );
      if (
        !!selectedDate &&
        (!this._isDayInRange(this._dateAdapter.toIso8601(selectedDate)) ||
          this._dateFilter(selectedDate))
      ) {
        this._value = selectedDate;
      } else {
        this._value = null;
      }
    }
  }
  public get value(): T | T[] | null {
    return this._value;
  }
  @state() private accessor _value: T | T[] | null = null;

  /** A function used to filter out dates. */
  @property({ attribute: 'date-filter' })
  public accessor dateFilter: ((date: T) => boolean) | null = null;

  /**
   * Set this with the format `YYYY-MM` to limit the calendar to a specific month,
   * and prevent navigation to other months.
   */
  @forceType()
  @property({ attribute: 'fixed-month' })
  public set fixedMonth(value: string) {
    const match = value ? value.match(/^(\d{4})-(\d{2})$/) : null;
    this._fixedMonth = match
      ? this._dateAdapter.createDate(Number(match[1]), Number(match[2]), 1)
      : null;
  }
  public get fixedMonth(): string {
    return this._fixedMonth
      ? this._dateAdapter.toIso8601(this._fixedMonth).split('-').slice(0, 2).join('-')
      : '';
  }
  private _fixedMonth: T | null = null;

  /** The orientation of days in the calendar. */
  @property({ reflect: true }) public accessor orientation: 'horizontal' | 'vertical' =
    'horizontal';

  /** Whether it has to display the week numbers in addition to week days. */
  @forceType()
  @property({ attribute: 'week-numbers', type: Boolean })
  public accessor weekNumbers: boolean = false;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  /** The currently active date. */
  @state() private accessor _activeDate: T = this._dateAdapter.today();

  @state() private accessor _calendarView: SbbCalendarElement['view'] = 'day';

  /** A list of days, in two formats (long and single char). */
  private _weekdays!: Weekday[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day<T>[][][] = [];

  /** The first visible day in the calendar. */
  private _firstVisibleDay: string = '';

  /** The last visible day in the calendar. */
  private _lastVisibleDay: string = '';

  /** Grid of calendar cells representing months. */
  private _months!: MonthCell[][];

  /** Grid of calendar cells representing years. */
  private _years!: number[][];

  /** An array containing all the month names in the current language. */
  private _monthNames: string[] = this._dateAdapter.getMonthNames('long');

  /** An array containing the weeks' numbers for the current month. */
  private _weekNumbers!: number[][];

  private _enhancedVariant: boolean = false;

  /** A list of calendar's cells corresponding to days, months or years depending on the view. */
  private get _cells(): SbbCalendarCellBaseElement<T>[] {
    return Array.from<SbbCalendarCellBaseElement<T>>(
      (this._calendarView === 'day'
        ? (Array.from(this.shadowRoot!.querySelectorAll('slot')).flatMap((e: HTMLSlotElement) =>
            e.assignedElements({ flatten: true }),
          ) as SbbCalendarDayElement<T>[])
        : this.shadowRoot?.querySelectorAll<SbbCalendarCellBaseElement<T>>(
            `sbb-calendar-${this._calendarView}`,
          )) ?? [],
    );
  }

  /** The chosen year in the year selection view. */
  private _chosenYear?: number;

  /** The chosen month in the year selection view. */
  private _chosenMonth?: number;

  /** Whether the focus should be reset on focusCell. */
  private _resetFocus = false;

  /** Whether an element inside the calendar is currently focused. */
  private _containingFocus = false;

  private _lastSelection: T | null = null;

  @state()
  private accessor _initialized = false;

  private _language = new SbbLanguageController(this).withHandler(() => {
    this._monthNames = this._dateAdapter.getMonthNames('long');
    this._createMonthRows();
  });

  public constructor() {
    super();
    this._createMonthRows();
    this._setWeekdays();

    // We need to track the focus as we should only take focus into the calendar, when the
    // focus was once set into the calendar.
    // For shadow DOM compatibility we need to track this programmatically.
    this.addEventListener('focusin', () => (this._containingFocus = true));
    this.addEventListener('focusout', () => (this._containingFocus = false));
    const resolveDay = (event: PointerEvent | KeyboardEvent): SbbCalendarDayElement<T> | null =>
      (event.target as HTMLElement).closest<SbbCalendarDayElement<T>>('sbb-calendar-day') ??
      event
        .composedPath()
        .find(
          (e): e is SbbCalendarDayElement<T> => (e as HTMLElement).localName === 'sbb-calendar-day',
        ) ??
      null;
    this.addEventListener('click', (event) => {
      const day = resolveDay(event);
      if (day) {
        this._selectDate(day.value!, event);
      }
    });
    this.addEventListener('keydown', (event) => {
      const day = resolveDay(event);
      if (day) {
        this._handleKeyboardEvent(event, day);
      }
    });
    this.addEventListener('blur', () => (this._lastSelection = null));
  }

  private readonly _sortDate = (a: T, b: T): number => this._dateAdapter.compareDate(a, b);

  private _dateFilter(date: T): boolean {
    return this.dateFilter?.(date) ?? true;
  }

  /** Resets the active month according to the new state of the calendar. */
  public resetPosition(): void {
    this._resetCalendarView();
    this._init();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.resetPosition();
    this.shadowRoot?.addEventListener('slotchange', this._onSlotChange, { capture: true });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.shadowRoot?.removeEventListener('slotchange', this._onSlotChange, { capture: true });
  }

  /**
   * Returns the list of days that are visible in the calendar.
   */
  public visibleDays(): Day<T>[] {
    return this._weeks.flat(2).sort((a, b) => a.value.localeCompare(b.value));
  }

  /** @internal */
  public override formResetCallback(): void {}

  /** @internal */
  public override formStateRestoreCallback(
    state: FormRestoreState | null,
    reason: FormRestoreReason,
  ): void {
    if (reason === 'autocomplete' || state == null) {
      return;
    }
    const restore = (value: string | T | null): T | null =>
      this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (typeof state === 'string') {
      this.value = restore(state);
    } else if (state instanceof FormData) {
      if (this.multiple) {
        this._readFormData(state as FormData).then(
          (array) => (this.value = array.map(restore).filter((date): date is T => date != null)),
        );
        return;
      }

      const entry = state.get(this.name);
      if (entry instanceof Blob) {
        entry.text().then((text) => (this.value = restore(JSON.parse(text))));
      } else {
        this.value = restore(entry);
      }
    }
  }

  private async _readFormData(formData: FormData): Promise<T[]> {
    return Promise.all(
      formData
        .getAll(this.name)
        .map(async (entry) =>
          entry instanceof Blob ? JSON.parse(await entry.text()) : (entry as T),
        ),
    );
  }

  /** @internal */
  public override focus(): void {
    this._resetFocus = true;
    this._focusCell();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (!this._initialized) {
      return;
    }

    if (
      changedProperties.has('amount') ||
      changedProperties.has('orientation') ||
      changedProperties.has('fixedMonth')
    ) {
      this.resetPosition();
    }

    if (changedProperties.has('view')) {
      this._setChosenYear();
      this._chosenMonth = undefined;
      this._calendarView = this.view;
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name === '_calendarView') {
      this.internals.states.delete(`view-${oldValue}`);
      this.internals.states.add(`view-${this._calendarView}`);
      if (this._containingFocus) {
        this._resetFocus = true;
      }
    }
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    // The calendar needs to calculate tab-indexes on first render,
    // and every time a date is selected or the month view changes.
    this._setTabIndex();

    // When changing view to year/month, the tabindex is changed, but the focused element is getting lost.
    // We need to call `_focusCell()` method explicitly to correctly set the focus.
    this._focusCell();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._emitMonthChange();
  }

  private _onSlotChange = (): void => {
    this._enhancedVariant = Array.from(this.children).some(
      (c) => c.localName === 'sbb-calendar-day',
    );
    this.toggleState('enhanced', this._enhancedVariant);
    this._setTabIndex();
  };

  /**
   * The `_value` state should be adapted when the `multiple` property changes:
   *   - if it changes to true, the '_value' is set to an array;
   *   - if it changes to false, the first available option is set as 'value' otherwise it's set to null.
   */
  private _onMultipleChanged(isMultiple: boolean): void {
    if (isMultiple && !Array.isArray(this._value)) {
      this._value = this._value ? [this._value as T] : [];
    }
    if (!isMultiple && Array.isArray(this._value)) {
      this._value = (this._value as T[]).length ? (this._value as T[])[0] : null;
    }
  }

  /** Initializes the component. */
  private _init(activeDate?: T): void {
    // Due to its complexity, the calendar is only initialized on client side
    if (isServer) {
      return;
    } else if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this._init());
      return;
    }

    if (activeDate) {
      this._assignActiveDate(activeDate);
    }

    const startDate = this._fixedMonth ?? this._activeDate;
    const amount = this.amount < 1 ? 1 : this.amount;
    this._weeks = Array.from({ length: amount }, (_, i) =>
      this._createWeekRows(this._dateAdapter.addCalendarMonths(startDate, i)),
    );
    const dateFromFirstMonth = this._weeks[0][0][0].dateValue;
    this._firstVisibleDay = this._dateAdapter.toIso8601(
      this._dateAdapter.createDate(
        this._dateAdapter.getYear(dateFromFirstMonth),
        this._dateAdapter.getMonth(dateFromFirstMonth),
        1,
      )!,
    );
    const dateFromLastMonth = this._weeks[amount - 1][0][0].dateValue;
    this._lastVisibleDay = this._dateAdapter.toIso8601(
      this._dateAdapter.createDate(
        this._dateAdapter.getYear(dateFromLastMonth),
        this._dateAdapter.getMonth(dateFromLastMonth),
        this._dateAdapter.getNumDaysInMonth(dateFromLastMonth),
      )!,
    );

    this._years = this._createYearRows();
    this._weekNumbers = this._weeks.map((week) =>
      week
        .flat()
        .sort((a, b) => a.value.localeCompare(b.value))
        .map((day: Day<T>) => day.weekValue)
        .filter((v, i, a) => a.indexOf(v) === i),
    );
    this._initialized = true;
  }

  /** Focuses on a day cell prioritizing the selected day, the current day, and lastly, the first selectable day. */
  private _focusCell(): void {
    if (this._resetFocus) {
      this._getFirstFocusable()?.focus();
      this._resetFocus = false;
    }
  }

  /** Creates the array of weekdays. */
  private _setWeekdays(): void {
    const narrowWeekdays: string[] = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays: string[] = this._dateAdapter.getDayOfWeekNames('long');
    const weekdays: Weekday[] = longWeekdays.map((long: string, i: number) => ({
      long,
      narrow: narrowWeekdays[i],
    }));

    // Rotates the labels for days of the week based on the configured first day of the week.
    const firstDayOfWeek: number = this._dateAdapter.getFirstDayOfWeek();
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }

  /** Creates the rows along the horizontal direction and sets the parameters used in keyboard navigation. */
  private _createWeekRows(value: T): Day<T>[][] {
    const daysInMonth: number = this._dateAdapter.getNumDaysInMonth(value);
    const weekOffset: number = this._dateAdapter.getFirstWeekOffset(value);
    return this.orientation === 'horizontal'
      ? this._createWeekRowsHorizontal(value, daysInMonth, weekOffset)
      : this._createWeekRowsVertical(value, daysInMonth, weekOffset);
  }

  /**
   * Creates the rows for each week in orientation='horizontal'.
   *
   * Iterates through the days of the months, creates a Day object for each and pushes it into and array.
   * Each seven days (considering the offset at the beginning of the month) restarts from an empty array.
   *
   * The result is a matrix in which every row is a week (or part of it, considering offset).
   */
  private _createWeekRowsHorizontal(value: T, daysInMonth: number, weekOffset: number): Day<T>[][] {
    const weeks: Day<T>[][] = [[]];
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_ROW) {
        weeks.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(value),
        this._dateAdapter.getMonth(value),
        i + 1,
      )!;
      weeks[weeks.length - 1].push(this._mapDateToDay(date));
    }
    return weeks;
  }

  /**
   * Creates the rows for each week in orientation='vertical'.
   *
   * Creates a matrix with seven empty rows.
   * Iterates through the days of the months, creates a Day object for each
   * and pushes it into the correct array considering the offset at the beginning of the month.
   * Each seven days (including offset) restarts from the first.
   *
   * The result is a matrix in which every row is a set of weekdays, so:
   * - row 0: all the Mondays;
   * - row 1: all the Tuesdays;
   * - ...
   * - row 7: all the Sundays.
   */
  private _createWeekRowsVertical(value: T, daysInMonth: number, weekOffset: number): Day<T>[][] {
    const weeks: Day<T>[][] = Array.from({ length: DAYS_PER_ROW }, () => []);
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_ROW) {
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(value),
        this._dateAdapter.getMonth(value),
        i + 1,
      )!;
      weeks[cell].push(this._mapDateToDay(date));
    }
    return weeks;
  }

  private _mapDateToDay(date: T): Day<T> {
    const isoDate = this._dateAdapter.toIso8601(date);
    return {
      value: isoDate,
      dateValue: date,
      dayValue: String(this._dateAdapter.getDate(date)),
      monthValue: String(this._dateAdapter.getMonth(date)),
      yearValue: String(this._dateAdapter.getYear(date)),
      // TODO: Improve performance of this, by keeping track of the
      // week number while iterating through the days.
      weekValue: this._getWeek(date),
      weekDayValue: this._dateAdapter.getDayOfWeek(date),
    };
  }

  private _getWeek(date: T): number {
    const firstDayOfYear = this._dateAdapter.createDate(this._dateAdapter.getYear(date), 1, 1);
    const weekday = this._dateAdapter.getDayOfWeek(firstDayOfYear);

    let weekIndex = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY].includes(weekday) ? 1 : 0;
    let weekStart = this._dateAdapter.addCalendarDays(
      firstDayOfYear,
      this._dateAdapter.getFirstWeekOffset(firstDayOfYear) * -1,
    );
    while (this._dateAdapter.compareDate(weekStart, date) <= 0) {
      const weekEnd = this._dateAdapter.addCalendarDays(weekStart, 6);
      if (this._dateAdapter.compareDate(date, weekEnd) <= 0) {
        return weekIndex > 0
          ? weekIndex
          : this._getWeek(this._dateAdapter.addCalendarDays(firstDayOfYear, -1));
      }
      weekStart = this._dateAdapter.addCalendarDays(weekStart, DAYS_PER_ROW);
      weekIndex++;
    }

    throw new Error('The provided date is invalid');
  }

  /** Force the conversion to ISO8601 formatted string. */
  private _mapValueToISODate(value: string | T): string {
    return typeof value === 'string' ? value : this._dateAdapter.toIso8601(value as T);
  }

  /** Creates the rows for the month selection view. */
  private _createMonthRows(): void {
    const months: MonthCell[] = new Array(12).fill(null).map((_, i: number): MonthCell => ({
      value: String(i + 1).padStart(2, '0'),
      monthValue: i + 1,
    }));
    const rows: number = 12 / MONTHS_PER_ROW;
    const monthArray: MonthCell[][] = [];
    for (let i: number = 0; i < rows; i++) {
      monthArray.push(months.slice(MONTHS_PER_ROW * i, MONTHS_PER_ROW * (i + 1)));
    }
    this._months = monthArray;
  }

  /** Creates the rows for the year selection view. */
  private _createYearRows(): number[][] {
    const startValueYearView: number = this._getStartValueYearView();
    const allYears: number[] = new Array(YEARS_PER_PAGE)
      .fill(0)
      .map((_, i: number) => startValueYearView + i);
    const rows: number = YEARS_PER_PAGE / YEARS_PER_ROW;
    const yearArray: number[][] = [];
    for (let i: number = 0; i < rows; i++) {
      yearArray.push(allYears.slice(YEARS_PER_ROW * i, YEARS_PER_ROW * (i + 1)));
    }
    return yearArray;
  }

  /**
   * Calculates the first year that will be shown in the year selection panel.
   * If `minDate` and `maxDate` are both null, the starting year is calculated as
   * the multiple of YEARS_PER_PAGE closest to and less than activeDate,
   * e.g., with `YEARS_PER_PAGE` = 24 and `activeDate` = 2020, the function will return 2016 (24 * 83),
   * while with `activeDate` = 2000, the function will return 1992 (24 * 82).
   * If `minDate` is not null, it returns the corresponding year; if `maxDate` is not null,
   * it returns the corresponding year minus `YEARS_PER_PAGE`, so that the `maxDate` is the last rendered year.
   * If both are not null, `maxDate` has priority over `minDate`.
   */
  private _getStartValueYearView(): number {
    let startingYear = 0;
    if (this.max) {
      startingYear = this._dateAdapter.getYear(this.max) - YEARS_PER_PAGE + 1;
    } else if (this.min) {
      startingYear = this._dateAdapter.getYear(this.min);
    }
    const activeYear = this._dateAdapter.getYear(this._activeDate);
    return (
      activeYear -
      ((((activeYear - startingYear) % YEARS_PER_PAGE) + YEARS_PER_PAGE) % YEARS_PER_PAGE)
    );
  }

  /** Checks if date is within the min-max range. */
  private _isDayInRange(dateString: string): boolean {
    if (!this.min && !this.max) {
      return true;
    }
    const date = this._dateAdapter.deserialize(dateString)!;
    return this._dateAdapter.sameDate(date, this._dateAdapter.clampDate(date, this.min, this.max));
  }

  /** Emits the selected date and sets it internally. */
  private _selectDate(day: T, event: PointerEvent): void {
    this._chosenMonth = undefined;
    this._setChosenYear();
    if (this.multiple) {
      // If a range is selected via Shift, a text selection range will be active.
      // We need to remove it to avoid having a text selection on top of the calendar cells,
      // which would create a confusing UX.
      // This also must be very early in the event handler, otherwise there will be a flash
      // of selection.
      window.getSelection()?.removeAllRanges();
      let selected = !this._value ? [] : Array.isArray(this._value) ? this._value : [this._value];
      const serializedSelected = selected.map((s) => this._dateAdapter.toIso8601(s));
      if (
        event.shiftKey &&
        this._lastSelection &&
        serializedSelected.includes(this._dateAdapter.toIso8601(this._lastSelection)) &&
        !serializedSelected.includes(this._dateAdapter.toIso8601(day))
      ) {
        const offset = this._dateAdapter.compareDate(this._lastSelection, day) < 0 ? 1 : -1;
        const range: string[] = [];
        let current = this._lastSelection;
        while (!this._dateAdapter.sameDate(current, day)) {
          current = this._dateAdapter.addCalendarDays(current, offset)!;
          const serializedCurrent = this._dateAdapter.toIso8601(current);
          if (!serializedSelected.includes(serializedCurrent)) {
            range.push(serializedCurrent);
          }
        }
        selected = this._mergeDates(range, serializedSelected);
      } else if (selected.some((sel) => this._dateAdapter.sameDate(sel, day))) {
        selected = selected.filter((sel) => !this._dateAdapter.sameDate(sel, day));
      } else {
        selected = [...selected, day].sort(this._sortDate);
      }

      this._lastSelection = day;
      this._value = selected;
      this._emitDateSelectedEvent(this._value.map((e) => this._dateAdapter.deserialize(e)!));
    } else if (!this._value || this._dateAdapter.compareDate(this._value as T, day) !== 0) {
      // In single selection, check if the day is already selected
      this._value = day;
      this._emitDateSelectedEvent(this._dateAdapter.deserialize(day)!);
    }
  }

  /**
   * Handle multiple dates selection via weekNumber / weekDay buttons:
   * - if Cmd or Ctrl are pressed, add the new date to the current ones;
   * - if not,
   *     - if the new dates are the same of the current ones, it means that the same button has been clicked twice, so do nothing;
   *     - if not, the selected dates are the new ones.
   */
  private _selectMultipleDates(days: Day<T>[]): void {
    this._value = this._mergeDates(days.map((e) => e.value));
    this._emitDateSelectedEvent(this._value.map((e) => this._dateAdapter.deserialize(e)!));
  }

  private _mergeDates(dates: string[], selected?: string[]): T[] {
    selected ??= (this._value as T[]).map((s) => this._dateAdapter.toIso8601(s));
    // Filter disabled days by matching the provided `dates` parameter against the enabled cells.
    // Since the buttons' value is set to the Day's interface value (ISO string), there's no need to deserialize it.
    const enabledDays: string[] = (this._cells as SbbCalendarDayElement<T>[])
      .filter((e) => !e.disabled)
      .map((e) => this._mapValueToISODate(e.value!));
    const daysToAdd: string[] = dates.filter((isoDate) => enabledDays.includes(isoDate));

    // In case of multiple selection, newly added days must be added to the
    // existing ones, without duplication.
    // If the days to add are exactly the same as the selected ones, the set
    // must be emptied.
    if (daysToAdd.every((day: string) => selected!.includes(day))) {
      selected = selected.filter((day: string) => !daysToAdd.includes(day));
    } else {
      selected = [...selected, ...daysToAdd].filter((v, i, a) => a.indexOf(v) === i);
    }
    return selected.map((s) => this._dateAdapter.deserialize(s)!).sort(this._sortDate);
  }

  /**
   * Emits the dateselected event given the detail (as T or T[] based on the value of the multiple flag).
   * FIXME: the name of the variable appears as event name in the readme
   *  due to a bug in the custom-elements-manifest library.
   *  https://github.com/open-wc/custom-elements-manifest/issues/149
   */
  private _emitDateSelectedEvent(dateselected: T | T[]): void {
    /** @type {SbbDateSelectedEvent<T>} Event emitted on date selection. */
    this.dispatchEvent(new SbbDateSelectedEvent<T>(dateselected));

    /** @type {InputEvent} Event emitted on user selection. */
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    /** @type {Event} Event emitted on user selection. */
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  private _emitMonthChange(): void {
    // FIXME: the name of this variable appears as event name in the readme
    //  due to a bug in the custom-elements-manifest library.
    //  https://github.com/open-wc/custom-elements-manifest/issues/149
    const monthchange = this.visibleDays();
    /**
     * @type {SbbMonthChangeEvent}
     * Emits when the month changes.
     * The `range` property contains the days array of the chosen month.
     */
    this.dispatchEvent(new SbbMonthChangeEvent(monthchange));
  }

  private _setChosenYear(): void {
    if (this.view === 'month') {
      let selectedDate: T | undefined;
      if (this.multiple) {
        selectedDate = (this.value as T[]).at(-1);
      } else {
        selectedDate = this.value as T;
      }
      this._chosenYear = this._dateAdapter.getYear(selectedDate ?? this._dateAdapter.today());
    } else {
      this._chosenYear = undefined;
    }
  }

  private _assignActiveDate(date: T): void {
    this._activeDate = this._dateAdapter.clampDate(date, this.min, this.max)!;
  }

  /** Goes to the month identified by the shift. */
  private _goToDifferentMonth(months: number): void {
    this._init(this._dateAdapter.addCalendarMonths(this._activeDate, months));
    this._emitMonthChange();
  }

  private _goToDifferentYear(years: number): void {
    this._chosenYear! += years;
    // Can't use `_assignActiveDate(...)` here, because it will set it to min/max value if argument is out of range
    this._activeDate = this._dateAdapter.createDate(
      this._chosenYear!,
      this._dateAdapter.getMonth(this._activeDate),
      this._dateAdapter.getDate(this._activeDate),
    );
    this._init();
  }

  private _goToDifferentYearRange(years: number): void {
    this._init(this._dateAdapter.addCalendarYears(this._activeDate, years));
  }

  private _prevDisabled(prevDate: T): boolean {
    if (!this.min) {
      return false;
    }
    return this._dateAdapter.compareDate(prevDate, this.min) < 0;
  }

  private _nextDisabled(nextDate: T): boolean {
    if (!this.max) {
      return false;
    }
    return this._dateAdapter.compareDate(nextDate, this.max) > 0;
  }

  /** Checks if the "previous month" button should be disabled. */
  private _previousMonthDisabled(): boolean {
    const prevMonth = this._dateAdapter.addCalendarDays(
      this._activeDate,
      this._dateAdapter.getDate(this._activeDate) * -1,
    );
    return this._prevDisabled(prevMonth);
  }

  /** Checks if the "next month" button should be disabled. */
  private _nextMonthDisabled(): boolean {
    let nextMonth = this._dateAdapter.addCalendarMonths(
      this._activeDate,
      this.amount < 1 ? 1 : this.amount,
    );
    nextMonth = this._dateAdapter.createDate(
      this._dateAdapter.getYear(nextMonth),
      this._dateAdapter.getMonth(nextMonth),
      1,
    );
    return this._nextDisabled(nextMonth);
  }

  /** Checks if the "previous year" button should be disabled. */
  private _previousYearDisabled(): boolean {
    const prevYear = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this._activeDate) - 1,
      12,
      31,
    );
    return this._prevDisabled(prevYear);
  }

  /** Checks if the "next year" button should be disabled. */
  private _nextYearDisabled(): boolean {
    const nextYear = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this._activeDate) + (this.amount < 1 ? 1 : this.amount),
      1,
      1,
    );
    return this._nextDisabled(nextYear);
  }

  /** Checks if the "previous year" button should be disabled in year view. */
  private _previousYearRangeDisabled(): boolean {
    const prevYear = this._dateAdapter.createDate(this._years[0][0] - 1, 12, 31);
    return this._prevDisabled(prevYear);
  }

  /** Checks if the "next year" button should be disabled in year view. */
  private _nextYearRangeDisabled(): boolean {
    const lastYear = this._years.flat(2).at(-1)!;
    const nextYear = this._dateAdapter.createDate(lastYear + 1, 1, 1);
    return this._nextDisabled(nextYear);
  }

  private _handleTableBlur(eventTarget: HTMLElement): void {
    if (eventTarget?.localName !== 'sbb-calendar-day') {
      this._setTabIndex();
    }
  }

  private _setTabIndex(): void {
    Array.from(this._cells.filter((e) => e.tabIndex === 0) ?? []).forEach(
      (day) => (day.tabIndex = -1),
    );
    const firstFocusable = this._getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  /** Get the element in the calendar to assign focus. */
  private _getFirstFocusable(): SbbCalendarCellBaseElement<T> | null {
    if (this._calendarView === 'day') {
      const selectedOrCurrent =
        this._cells.find((e) => e.matches(':state(selected)')) ??
        this._cells.find((e) => e.matches(':state(current)'));
      return selectedOrCurrent && !selectedOrCurrent.disabled
        ? selectedOrCurrent
        : this._getFirstFocusableDay();
    } else {
      const selectedOrCurrent =
        this.shadowRoot?.querySelector<SbbCalendarCellBaseElement<T>>(
          `sbb-calendar-${this._calendarView}:state(selected)`,
        ) ??
        this.shadowRoot?.querySelector<SbbCalendarCellBaseElement<T>>(
          `sbb-calendar-${this._calendarView}:state(current)`,
        );
      return selectedOrCurrent && !selectedOrCurrent.disabled
        ? selectedOrCurrent
        : this.shadowRoot!.querySelector<SbbCalendarCellBaseElement<T>>(
            `sbb-calendar-${this._calendarView}:not([disabled])`,
          );
    }
  }

  /**
   * In `day` view in `vertical` orientation,
   * if the first of the month is not a Monday, it is not the first rendered element in the table,
   * so `this.shadowRoot!.querySelector('sbb-calendar-day:not([disabled])')` will return a wrong value.
   *
   * To solve this, the element with the lowest `value` is taken (ISO String are ordered).
   */
  private _getFirstFocusableDay(): SbbCalendarDayElement<T> | null {
    const cells = this._cells as SbbCalendarDayElement<T>[];
    const daysInView = cells.filter((e) => !e.disabled);
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      const firstElement = daysInView
        .map((e): string => this._dateAdapter.toIso8601(e.value! as T))
        .sort()[0];
      return cells.find((e) => e.matches(`[slot="${firstElement}"]`))! ?? null;
    }
  }

  private _handleKeyboardEvent(event: KeyboardEvent, day?: SbbCalendarDayElement<T>): void {
    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
    }
    // Gets the currently rendered table's cell;
    // they could be days, months or years based on the current selection view.
    const origin = day ?? (event.target as SbbCalendarDayElement<T>);
    const cells = this._cells;
    const index: number = cells.indexOf(origin);
    let nextEl: SbbCalendarCellBaseElement<T>;
    if (day) {
      nextEl = this._navigateByKeyboardDayView(
        event,
        index,
        cells as SbbCalendarDayElement<T>[],
        this._mapDateToDay(day.value! as T),
      );
    } else {
      nextEl = this._navigateByKeyboard(event, index, cells);
    }
    const activeEl = (this._enhancedVariant ? document : this.shadowRoot!)
      .activeElement as SbbCalendarCellBaseElement<T>;
    if (nextEl !== activeEl) {
      nextEl.tabIndex = 0;
      nextEl.focus();

      if (cells.includes(activeEl)) {
        activeEl.tabIndex = -1;
      }
    }
  }

  private _navigateByKeyboardDayView(
    evt: KeyboardEvent,
    index: number,
    cells: SbbCalendarDayElement<T>[],
    day: Day<T>,
  ): SbbCalendarDayElement<T> {
    const arrowsOffset =
      this.orientation === 'horizontal'
        ? { leftRight: 1, upDown: DAYS_PER_ROW }
        : { leftRight: DAYS_PER_ROW, upDown: 1 };

    switch (evt.key) {
      case 'ArrowUp':
        return this._findDayArrows(cells, index, day.dateValue, -arrowsOffset.upDown);
      case 'ArrowDown':
        return this._findDayArrows(cells, index, day.dateValue, arrowsOffset.upDown);
      case 'ArrowLeft':
        return this._findDayArrows(cells, index, day.dateValue, -arrowsOffset.leftRight);
      case 'ArrowRight':
        return this._findDayArrows(cells, index, day.dateValue, arrowsOffset.leftRight);
      case 'PageUp': {
        if (this.orientation === 'horizontal') {
          const firstOfWeek: number = +day.dayValue % DAYS_PER_ROW || DAYS_PER_ROW;
          const delta: number = firstOfWeek - +day.dayValue;
          return this._findDayPageUpDown(cells, index, day, delta, arrowsOffset.upDown);
        } else {
          const offsetForVertical: number = this._dateAdapter.getFirstWeekOffset(day.dateValue);
          const weekNumber: number = Math.ceil((+day.dayValue + offsetForVertical) / DAYS_PER_ROW);
          const firstOfWeek: number = (weekNumber - 1) * DAYS_PER_ROW - offsetForVertical + 1;
          const delta: number = firstOfWeek - +day.dayValue;
          return this._findDayPageUpDown(cells, index, day, delta, arrowsOffset.upDown);
        }
      }
      case 'PageDown': {
        if (this.orientation === 'horizontal') {
          const monthInBounds = +day.monthValue + 1 > 12 ? 1 : +day.monthValue + 1;
          const yearInBounds = +day.monthValue + 1 > 12 ? +day.yearValue + 1 : +day.yearValue;
          const firstNextMonth: T = this._dateAdapter.createDate(yearInBounds, monthInBounds, 1);
          const lastOfMonth: number = this._dateAdapter.getDate(
            this._dateAdapter.addCalendarDays(firstNextMonth, -1),
          );
          const delta: number =
            Math.trunc((lastOfMonth - +day.dayValue!) / DAYS_PER_ROW) * DAYS_PER_ROW;
          return this._findDayPageUpDown(cells, index, day, delta, -arrowsOffset.upDown);
        } else {
          const offsetForVertical: number = this._dateAdapter.getFirstWeekOffset(day.dateValue);
          const weekNumber: number = Math.ceil((+day.dayValue + offsetForVertical) / DAYS_PER_ROW);
          const lastOfWeek: number = weekNumber * DAYS_PER_ROW - offsetForVertical;
          const delta: number = lastOfWeek - +day.dayValue;
          return this._findDayPageUpDown(cells, index, day, delta, -arrowsOffset.upDown);
        }
      }
      case 'Home': {
        return this._findDayFirst(cells, index, day, 1);
      }
      case 'End': {
        const monthInBounds = +day.monthValue + 1 > 12 ? 1 : +day.monthValue + 1;
        const yearInBounds = +day.monthValue + 1 > 12 ? +day.yearValue + 1 : +day.yearValue;
        const firstNextMonth: T = this._dateAdapter.createDate(yearInBounds, monthInBounds, 1);
        return this._findDayLast(cells, index, firstNextMonth);
      }
      default:
        return cells[index];
    }
  }

  private _isDayOutOfView(date: string): boolean {
    return date < this._firstVisibleDay || date > this._lastVisibleDay;
  }

  private _findDayArrows(
    cells: SbbCalendarDayElement<T>[],
    index: number,
    date: T,
    delta: number,
  ): SbbCalendarDayElement<T> {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.addCalendarDays(date, delta),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => this._mapValueToISODate(e.value!) === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayArrows(cells, index, this._dateAdapter.deserialize(newDateValue)!, delta);
    }
    return nextCell;
  }

  private _findDayPageUpDown(
    cells: SbbCalendarDayElement<T>[],
    index: number,
    day: Day<T>,
    delta: number,
    deltaIfDisabled: number,
  ): SbbCalendarDayElement<T> {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.addCalendarDays(day.dateValue, delta),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => this._mapValueToISODate(e.value!) === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayPageUpDown(cells, index, day, delta + deltaIfDisabled, deltaIfDisabled);
    }
    return nextCell;
  }

  private _findDayFirst(
    cells: SbbCalendarDayElement<T>[],
    index: number,
    day: Day<T>,
    date: number,
  ): SbbCalendarDayElement<T> {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.createDate(+day.yearValue, +day.monthValue, date),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => this._mapValueToISODate(e.value!) === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayFirst(cells, index, day, date + 1);
    }
    return nextCell;
  }

  private _findDayLast(
    cells: SbbCalendarDayElement<T>[],
    index: number,
    firstNextMonth: T,
  ): SbbCalendarDayElement<T> {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.addCalendarDays(firstNextMonth, -1),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => this._mapValueToISODate(e.value!) === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayLast(cells, index, this._dateAdapter.deserialize(newDateValue)!);
    }
    return nextCell;
  }

  /**
   * Gets the index of the element to move to, based on a list of elements (which can be potentially disabled),
   * the keyboard input and the position of the current element in the list.
   * In the day view, the `day?: Day` parameter is mandatory for calculation,
   * while in month and year view it's not due to the fixed amount of rendered cells.
   */
  private _navigateByKeyboard(
    evt: KeyboardEvent,
    index: number,
    cells: SbbCalendarCellBaseElement<T>[],
  ): SbbCalendarCellBaseElement<T> {
    const {
      elementIndexForWideMode,
      offsetForWideMode,
      lastElementIndexForWideMode,
      verticalOffset,
    }: CalendarKeyboardNavigationMonthYearViewsParameters =
      this._calculateParametersForKeyboardNavigation(index, this._calendarView === 'year');

    switch (evt.key) {
      case 'ArrowUp':
        return this._findNext(cells, index, -verticalOffset);
      case 'ArrowDown':
        return this._findNext(cells, index, verticalOffset);
      case 'ArrowLeft':
        return this._findNext(cells, index, -1);
      case 'ArrowRight':
        return this._findNext(cells, index, 1);
      case 'Home':
        return this._findFirst(cells, offsetForWideMode);
      case 'PageUp':
        return this._findFirstOnColumn(
          cells,
          elementIndexForWideMode,
          offsetForWideMode,
          verticalOffset,
        );
      case 'PageDown':
        return this._findLastOnColumn(cells, index, lastElementIndexForWideMode, verticalOffset);
      case 'End':
        return this._findLast(cells, lastElementIndexForWideMode - 1);
      default:
        return cells[index];
    }
  }

  /**
   * Calculates the parameters needed in keyboard navigation in year and month view.
   * @param index The starting element's index in the cell array.
   * @param isYearView Whether the displayed `view` is the year one.
   */
  private _calculateParametersForKeyboardNavigation(
    index: number,
    isYearView: boolean,
  ): CalendarKeyboardNavigationMonthYearViewsParameters {
    const elementsPerPage = isYearView ? YEARS_PER_PAGE : MONTHS_PER_PAGE;
    const offset: number = Math.trunc(index / elementsPerPage) * elementsPerPage;
    const indexInView: number = offset === 0 ? index : index - elementsPerPage;
    return {
      verticalOffset: isYearView ? YEARS_PER_ROW : MONTHS_PER_ROW,
      elementIndexForWideMode: indexInView,
      offsetForWideMode: index - indexInView,
      lastElementIndexForWideMode: offset === 0 ? elementsPerPage : elementsPerPage * 2,
    };
  }

  /**
   * Gets the next element of the provided array starting from `index` by adding `delta`.
   * If the found element is disabled, it continues adding `delta` until it finds an enabled one in the array bounds.
   */
  private _findNext(
    days: SbbCalendarCellBaseElement<T>[],
    index: number,
    delta: number,
  ): SbbCalendarCellBaseElement<T> {
    let nextIndex = index + delta;
    while (nextIndex < days.length && days[nextIndex]?.disabled) {
      nextIndex += delta;
    }
    return days[nextIndex] ?? days[index];
  }

  /** Find the first enabled element in the provided array. */
  private _findFirst(
    days: SbbCalendarCellBaseElement<T>[],
    firstOfCurrentMonth: number,
  ): SbbCalendarCellBaseElement<T> {
    return !days[firstOfCurrentMonth].disabled
      ? days[firstOfCurrentMonth]
      : this._findNext(days, firstOfCurrentMonth, 1);
  }

  /** Find the last enabled element in the provided array. */
  private _findLast(
    days: SbbCalendarCellBaseElement<T>[],
    lastOfCurrentMonth: number,
  ): SbbCalendarCellBaseElement<T> {
    return !days[lastOfCurrentMonth].disabled
      ? days[lastOfCurrentMonth]
      : this._findNext(days, lastOfCurrentMonth, -1);
  }

  /** Find the first enabled element in the same column of the provided array. */
  private _findFirstOnColumn(
    days: SbbCalendarCellBaseElement<T>[],
    index: number,
    offset: number,
    verticalOffset: number,
  ): SbbCalendarCellBaseElement<T> {
    const nextIndex = (index % verticalOffset) + offset;
    return !days[nextIndex].disabled
      ? days[nextIndex]
      : this._findNext(days, nextIndex, verticalOffset);
  }

  /** Find the last enabled element in the same column of the provided array. */
  private _findLastOnColumn(
    days: SbbCalendarCellBaseElement<T>[],
    index: number,
    offset: number,
    verticalOffset: number,
  ): SbbCalendarCellBaseElement<T> {
    const nextIndex = index + Math.trunc((offset - index - 1) / verticalOffset) * verticalOffset;
    return !days[nextIndex].disabled
      ? days[nextIndex]
      : this._findNext(days, nextIndex, -verticalOffset);
  }

  private _resetCalendarViewAndEmitMonthChange(): void {
    this._resetCalendarView();
    this._emitMonthChange();
  }

  private _resetCalendarView(): void {
    if (this._containingFocus) {
      this._resetFocus = true;
    }
    this._activeDate =
      (this.multiple ? (this._value as T[]).at(-1) : (this._value as T)) ??
      this._dateAdapter.today();
    this._setChosenYear();
    this._chosenMonth = undefined;
    this._init();
    this._calendarView = this.view;
  }

  /** Creates the calendar table for the daily view. */
  private _createDayTable(
    weeks: Day<T>[][],
    weekNumbers: number[],
    first: boolean,
  ): TemplateResult {
    const firstDay = weeks[0][0].dateValue;
    const monthLabel = `${
      this._monthNames[this._dateAdapter.getMonth(firstDay) - 1]
    } ${this._dateAdapter.getYear(firstDay)}`;
    const weeksForSelectMultipleWeekNumbers: Day<T>[] = weeks.flat();
    const weeksForSelectMultipleWeekDays: Day<T>[] = weeks.flat();
    return html`
      <div class="sbb-calendar__table-wrapper sbb-calendar__day-view">
        <div class="sbb-calendar__table-header">
          <span>${monthLabel}</span> ${first ? this._createDayTableControls(monthLabel) : nothing}
        </div>
        <table
          class="sbb-calendar__table"
          @focusout=${(event: FocusEvent) =>
            this._handleTableBlur(event.relatedTarget as HTMLElement)}
        >
          <thead>
            <tr>
              ${
                this.weekNumbers ? html`<th class="sbb-calendar__table-header-cell"></th>` : nothing
              }
              ${this._weekdays.map(
                (weekDay: Weekday, index: number) => html`
                  <th class="sbb-calendar__table-header-cell">
                    ${
                      this.multiple
                        ? html`
                            <sbb-calendar-weekday
                              .value=${weekDay}
                              @click=${() => {
                                // NOTE: Sundays have index 7, while their weekDayValue is 0
                                const days: Day<T>[] = weeksForSelectMultipleWeekDays.filter(
                                  (day: Day<T>) => day.weekDayValue === (index + 1) % 7,
                                )!;
                                this._selectMultipleDates(days);
                              }}
                            ></sbb-calendar-weekday>
                          `
                        : html`
                            <span class="sbb-screen-reader-only">${weekDay.long}</span>
                            <span aria-hidden="true">${weekDay.narrow}</span>
                          `
                    }
                  </th>
                `,
              )}
            </tr>
          </thead>
          <tbody>
            ${weeks.map((week: Day<T>[], rowIndex: number) => {
              const firstRowOffset: number = DAYS_PER_ROW - week.length;
              if (rowIndex === 0 && firstRowOffset) {
                return html`
                  <tr>
                    ${
                      this.weekNumbers
                        ? html`
                            <td class="sbb-calendar__table-header-cell-vertical">
                              ${
                                this.multiple
                                  ? html`
                                      <sbb-calendar-weeknumber
                                        .value=${weekNumbers[0]}
                                        @click=${() => {
                                        const days: Day<T>[] =
                                          weeksForSelectMultipleWeekNumbers.filter(
                                            (day: Day<T>) => day.weekValue === weekNumbers[0],
                                          )!;
                                        this._selectMultipleDates(days);
                                      }}
                                      ></sbb-calendar-weeknumber>
                                    `
                                  : html`
                                      <span class="sbb-screen-reader-only"
                                        >${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumbers[0]}`}</span
                                      >
                                      <span aria-hidden="true">${weekNumbers[0]}</span>
                                    `
                              }
                            </td>
                          `
                        : nothing
                    }
                    ${[...Array(firstRowOffset).keys()].map(
                      () => html`<td class="sbb-calendar__table-data"></td>`,
                    )}
                    ${this._createDayCells(week)}
                  </tr>
                `;
              }
              return html`
                <tr>
                  ${
                    this.weekNumbers
                      ? html`
                          <td class="sbb-calendar__table-header-cell-vertical">
                            ${
                              this.multiple
                                ? html`
                                    <sbb-calendar-weeknumber
                                      .value=${weekNumbers[rowIndex]}
                                      @click=${() => {
                                      const days: Day<T>[] =
                                        weeksForSelectMultipleWeekNumbers.filter(
                                          (day: Day<T>) => day.weekValue === weekNumbers[rowIndex],
                                        )!;
                                      this._selectMultipleDates(days);
                                    }}
                                    ></sbb-calendar-weeknumber>
                                  `
                                : html`
                                    <span class="sbb-screen-reader-only"
                                      >${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumbers[rowIndex]}`}</span
                                    >
                                    <span aria-hidden="true">${weekNumbers[rowIndex]}</span>
                                  `
                            }
                          </td>
                        `
                      : nothing
                  }
                  ${this._createDayCells(week)}
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }

  /** Creates the table in orientation='vertical'. */
  private _createDayTableVertical(
    weeks: Day<T>[][],
    weekNumbers: number[],
    first: boolean,
  ): TemplateResult {
    const firstDay = weeks[0][0].dateValue;
    const monthLabel = `${
      this._monthNames[this._dateAdapter.getMonth(firstDay) - 1]
    } ${this._dateAdapter.getYear(firstDay)}`;
    const activeDate = weeks[0][0].dateValue;
    const weekOffset = this._dateAdapter.getFirstWeekOffset(activeDate ?? this._activeDate);
    const weeksForSelectMultipleWeekNumbers: Day<T>[] = weeks.flat();
    return html`
      <div class="sbb-calendar__table-wrapper sbb-calendar__day-view">
        <div class="sbb-calendar__table-header">
          <span>${monthLabel}</span> ${first ? this._createDayTableControls(monthLabel) : nothing}
        </div>
        <table
          class="sbb-calendar__table"
          @focusout=${(event: FocusEvent) =>
            this._handleTableBlur(event.relatedTarget as HTMLElement)}
        >
          ${
            this.weekNumbers
              ? html`
                  <thead>
                    <tr>
                      <th class="sbb-calendar__table-data"></th>
                      ${weekNumbers.map(
                        (weekNumber: number) => html`
                          <th class="sbb-calendar__table-header-cell">
                            ${
                            this.multiple
                              ? html`
                                  <sbb-calendar-weeknumber
                                    .value=${weekNumber}
                                    @click=${() => {
                                      const days: Day<T>[] =
                                        weeksForSelectMultipleWeekNumbers.filter(
                                          (day: Day<T>) => day.weekValue === weekNumber,
                                        )!;
                                      this._selectMultipleDates(days);
                                    }}
                                  ></sbb-calendar-weeknumber>
                                `
                              : html`
                                  <span class="sbb-screen-reader-only"
                                    >${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumber}`}</span
                                  >
                                  <span aria-hidden="true">${weekNumber}</span>
                                `
                          }
                          </th>
                        `,
                      )}
                    </tr>
                  </thead>
                `
              : nothing
          }
          <tbody>
            ${weeks.map((week: Day<T>[], rowIndex: number) => {
              const weekday = this._weekdays[rowIndex];
              return html`
                <tr>
                  <td class="sbb-calendar__table-header-cell-vertical">
                    ${
                      this.multiple
                        ? html`
                            <sbb-calendar-weekday
                              .value=${weekday}
                              @click=${() => this._selectMultipleDates(week)}
                            >
                              ${weekday.narrow}
                            </sbb-calendar-weekday>
                          `
                        : html`
                            <span class="sbb-screen-reader-only">${weekday.long}</span>
                            <span aria-hidden="true">${weekday.narrow}</span>
                          `
                    }
                  </td>
                  ${
                    rowIndex < weekOffset
                      ? html`<td class="sbb-calendar__table-data"></td>`
                      : nothing
                  }
                  ${this._createDayCells(week)}
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }

  private _createDayTableControls(monthLabel: string): TemplateResult[] {
    return this._fixedMonth
      ? []
      : [
          this._getArrow(
            'left',
            () => this._goToDifferentMonth(-1),
            i18nPreviousMonth[this._language.current],
            this._previousMonthDisabled(),
          ),
          this._getArrow(
            'right',
            () => this._goToDifferentMonth(1),
            i18nNextMonth[this._language.current],
            this._nextMonthDisabled(),
          ),
          this._getArrow(
            'up',
            () => {
              this._resetFocus = true;
              this._calendarView = 'year';
            },
            `${i18nYearMonthSelection[this._language.current]} ${monthLabel}`,
          ),
        ];
  }

  /** Creates the cells for the daily view. */
  private _createDayCells(week: Day<T>[]): TemplateResult[] {
    return week.map((day: Day<T>) => {
      return html`
        <td class="sbb-calendar__table-data sbb-calendar__day-cell">
          <slot name=${day.value}>
            <sbb-calendar-day slot=${day.value}></sbb-calendar-day>
          </slot>
        </td>
      `;
    });
  }

  /** Render the view for the month selection. */
  private _renderMonthView(): TemplateResult {
    return html`
      <div class="sbb-calendar__table-wrapper sbb-calendar__month-view">
        <div class="sbb-calendar__table-header">
          <span>${this._chosenYear}</span>
          ${
            this._fixedMonth
              ? []
              : [
                  this._getArrow(
                    'left',
                    () => this._goToDifferentYear(-1),
                    i18nPreviousYear[this._language.current],
                    this._previousYearDisabled(),
                  ),
                  this._getArrow(
                    'right',
                    () => this._goToDifferentYear(1),
                    i18nNextYear[this._language.current],
                    this._nextYearDisabled(),
                  ),
                  this._getArrow(
                    'down',
                    () => this._resetCalendarViewAndEmitMonthChange(),
                    i18nCalendarDateSelection[this._language.current],
                  ),
                ]
          }
          <span class="sbb-screen-reader-only" role="status">${this._chosenYear}</span>
        </div>
        <table class="sbb-calendar__table">
          <tbody>
            ${this._months.map(
              (row: MonthCell[]) => html`
                <tr>
                  ${row.map((month: MonthCell) => {
                    return html`
                      <td class="sbb-calendar__table-data">
                        <sbb-calendar-month
                          .value="${this._chosenYear}-${month.value}"
                          @click=${() =>
                            this._onMonthSelection(month.monthValue, this._chosenYear!)}
                          @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
                        >
                        </sbb-calendar-month>
                      </td>
                    `;
                  })}
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  /** Select the month and change the view to day selection. */
  private _onMonthSelection(month: number, year: number): void {
    this._chosenMonth = month;
    this._calendarView = 'day';
    this._init(
      this._dateAdapter.createDate(
        year,
        this._chosenMonth,
        this._dateAdapter.getDate(this._activeDate),
      ),
    );
    this._emitMonthChange();
  }

  /** Render the view for the year selection. */
  private _renderYearView(): TemplateResult {
    const firstYear: number = this._years.flat(2)[0];
    const lastYearArray: number[] = this._years.at(-1)!.flat();
    const lastYear: number = lastYearArray[lastYearArray.length - 1];
    const yearLabel = `${firstYear} - ${lastYear}`;
    return html`
      <div class="sbb-calendar__table-wrapper sbb-calendar__year-view">
        <div class="sbb-calendar__table-header">
          <span>${yearLabel}</span>
          ${
            this._fixedMonth
              ? []
              : [
                  this._getArrow(
                    'left',
                    () => this._goToDifferentYearRange(-YEARS_PER_PAGE),
                    i18nPreviousYearRange(YEARS_PER_PAGE)[this._language.current],
                    this._previousYearRangeDisabled(),
                  ),
                  this._getArrow(
                    'right',
                    () => this._goToDifferentYearRange(YEARS_PER_PAGE),
                    i18nNextYearRange(YEARS_PER_PAGE)[this._language.current],
                    this._nextYearRangeDisabled(),
                  ),
                  this._getArrow(
                    'down',
                    () => this._resetCalendarViewAndEmitMonthChange(),
                    i18nCalendarDateSelection[this._language.current],
                  ),
                ]
          }
          <span class="sbb-screen-reader-only" role="status">${yearLabel}</span>
        </div>
        <table class="sbb-calendar__table">
          <tbody>
            ${this._years.map(
              (row: number[]) =>
                html` <tr>
                  ${row.map((year: number) => {
                    return html`
                      <td class="sbb-calendar__table-data">
                        <sbb-calendar-year
                          .value=${String(year)}
                          @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
                          @click=${() => this._onYearSelection(year)}
                        >
                        </sbb-calendar-year>
                      </td>
                    `;
                  })}
                </tr>`,
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  /** Select the year and change the view to month selection. */
  private _onYearSelection(year: number): void {
    this._chosenYear = year;
    this._calendarView = 'month';
    this._assignActiveDate(
      this._dateAdapter.createDate(
        this._chosenYear,
        this._dateAdapter.getMonth(this._activeDate),
        this._dateAdapter.getDate(this._activeDate),
      ),
    );
  }

  /** Creates the button arrow for all the views. */
  private _getArrow(
    direction: 'left' | 'right' | 'down' | 'up',
    click: () => void,
    ariaLabel: string,
    disabled = false,
  ): TemplateResult {
    return html`<sbb-secondary-button
      class="sbb-calendar__control"
      size="s"
      icon-name="chevron-small-${direction}-small"
      aria-label=${ariaLabel}
      @click=${click}
      ?disabled=${disabled}
    ></sbb-secondary-button>`;
  }

  private _getView(): TemplateResult | typeof nothing {
    switch (this._calendarView) {
      case 'year':
        return this._renderYearView();
      case 'month':
        return this._renderMonthView();
      default:
        return nothing;
    }
  }

  protected override render(): TemplateResult {
    if (isServer || this.hydrationRequired) {
      // TODO: We disable SSR for calendar for now. Figure out, if there is a way
      // to enable it, while considering i18n and date information.
      return html`${nothing}`;
    }

    return html`<div class="sbb-calendar__wrapper">
      ${
        this.orientation === 'horizontal'
          ? this._weeks.map((weeks, i) =>
              this._createDayTable(weeks, this._weekNumbers[i], i === 0),
            )
          : this._weeks.map((weeks, i) =>
              this._createDayTableVertical(weeks, this._weekNumbers[i], i === 0),
            )
      }
      ${this._getView()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar': SbbCalendarElement;
  }
  interface HTMLElementEventMap {
    monthchange: SbbMonthChangeEvent;
  }
}
