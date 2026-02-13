import { eachWeekOfInterval, endOfMonth, getWeek, startOfMonth } from 'date-fns';
import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { isArrowKeyOrPageKeysPressed } from '../../core/a11y.ts';
import { readConfig } from '../../core/config.ts';
import {
  SbbLanguageController,
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointLargeAndAbove,
} from '../../core/controllers.ts';
import type { DateAdapter } from '../../core/datetime.ts';
import {
  DAYS_PER_ROW,
  defaultDateAdapter,
  MONTHS_PER_PAGE,
  MONTHS_PER_ROW,
  YEARS_PER_PAGE,
  YEARS_PER_ROW,
} from '../../core/datetime.ts';
import { forceType, handleDistinctChange, plainDate } from '../../core/decorators.ts';
import {
  i18nCalendarDateSelection,
  i18nCalendarWeekNumber,
  i18nNextMonth,
  i18nNextYear,
  i18nNextYearRange,
  i18nPreviousMonth,
  i18nPreviousYear,
  i18nPreviousYearRange,
  i18nYearMonthSelection,
} from '../../core/i18n.ts';
import type { SbbOrientation } from '../../core/interfaces.ts';
import { SbbElementInternalsMixin, SbbHydrationMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';

import style from './calendar.scss?lit&inline';
import '../../button/secondary-button.ts';
import '../../icon.ts';
import '../../screen-reader-only.ts';
import '../calendar-day/calendar-day.component.ts';

export class SbbMonthChangeEvent extends Event {
  private readonly _range: readonly Day[];

  public get range(): readonly Day[] {
    return this._range;
  }

  public constructor(range: readonly Day[]) {
    super('monthchange', { bubbles: true, composed: true });
    this._range = Object.freeze(range || []);
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

/**
 * Parameters needed in day view to correctly calculate the next element in keyboard navigation.
 *
 * In orientation='vertical', it's not possible to rely on any array/index to calculate the element to navigate to,
 * so calculations on dates must be done, which should consider view boundaries, offsets and month's length.
 */
interface CalendarKeyboardNavigationDayViewParameters {
  /** The first day rendered. */
  firstDayInView: string | null;
  /** The last day rendered. It depends on the 'wide' value. */
  lastDayInView: string | null;
  /** The offset from the first day of the week (Monday) of the first rendered month. */
  firstMonthOffset: number;
  /** The number of days in the first rendered month. */
  firstMonthLength: number;
  /** The offset from the first day of the week (Monday) of the second rendered month. If wide is false, it's equal to zero. */
  secondMonthOffset: number;
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

export interface Month {
  value: string;
  longValue: string;
  monthValue: number;
}

export interface Weekday {
  long: string;
  narrow: string;
}

export type CalendarView = 'day' | 'month' | 'year';

/**
 * It displays a calendar which allows choosing a date.
 *
 * @slot - Use the unnamed slot to add customized `sbb-calendar-day` elements.
 */
export
@customElement('sbb-calendar')
class SbbCalendarElement<T extends Date = Date> extends SbbHydrationMixin(
  SbbElementInternalsMixin(LitElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    dateselected: 'dateselected',
    monthchange: 'monthchange',
  } as const;

  /** If set to true, two months are displayed */
  @forceType()
  @property({ type: Boolean })
  public accessor wide: boolean = false;

  /** The initial view of the calendar which should be displayed on opening. */
  @property() public accessor view: CalendarView = 'day';

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
  public set selected(value: T | T[] | null) {
    if (Array.isArray(value)) {
      this._selected = value
        .map((dateLike: T) =>
          this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(dateLike)),
        )
        .filter((date: T | null): date is T => date !== null)
        .filter(
          (date: T) =>
            !this._isDayInRange(this._dateAdapter.toIso8601(date)) || this._dateFilter(date),
        );
    } else {
      const selectedDate = this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value),
      );
      if (
        !!selectedDate &&
        (!this._isDayInRange(this._dateAdapter.toIso8601(selectedDate)) ||
          this._dateFilter(selectedDate))
      ) {
        this._selected = selectedDate;
      } else {
        this._selected = null;
      }
    }
  }
  public get selected(): T | T[] | null {
    return this._selected;
  }
  @state() private accessor _selected: T | T[] | null = null;

  /** A function used to filter out dates. */
  @property({ attribute: 'date-filter' })
  public accessor dateFilter: ((date: T | null) => boolean) | null = null;

  /** The orientation of days in the calendar. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'horizontal';

  /** Whether it has to display the week numbers in addition to week days. */
  @forceType()
  @property({ attribute: 'week-numbers', type: Boolean })
  public accessor weekNumbers: boolean = false;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  /** The currently active date. */
  @state() private accessor _activeDate: T = this._dateAdapter.today();

  /** The current wide property considering property value and breakpoints. From zero to small `wide` has always to be false. */
  @state()
  private set _wide(wide: boolean) {
    this.toggleState('wide', wide);
    this._wideInternal = wide;
  }
  private get _wide(): boolean {
    return this._wideInternal;
  }
  // We keep the state in a field because of the WebKit bug https://bugs.webkit.org/show_bug.cgi?id=303467.
  // TODO: re-check whether field is needed
  private _wideInternal: boolean = false;

  @state() private accessor _calendarView: CalendarView = 'day';

  private _nextCalendarView: CalendarView = 'day';

  /** Information about the rendered day view; used in keyboard navigation. */
  private _keyboardNavigationDayViewParameters: CalendarKeyboardNavigationDayViewParameters = {
    firstDayInView: null,
    lastDayInView: null,
    firstMonthOffset: 0,
    firstMonthLength: 0,
    secondMonthOffset: 0,
  };

  /** A list of days, in two formats (long and single char). */
  private _weekdays!: Weekday[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day<T>[][] = [];

  /** Grid of calendar cells representing months. */
  private _months!: Month[][];

  /** Grid of calendar cells representing years. */
  private _years!: number[][];

  /** Grid of calendar cells representing years for the wide view. */
  private _nextMonthYears!: number[][];

  /** Grid of calendar cells representing the dates of the next month. */
  private _nextMonthWeeks!: Day<T>[][];

  /** An array containing all the month names in the current language. */
  private _monthNames: string[] = this._dateAdapter.getMonthNames('long');

  /** An array containing the weeks' numbers for the current month. */
  private _weekNumbers!: number[];

  /** An array containing the weeks' numbers for the next month in wide mode. */
  private _nextMonthWeekNumbers!: number[];

  private _enhancedVariant: boolean = false;

  /** A list of buttons corresponding to days, months or years depending on the view. */
  private get _cells(): (HTMLButtonElement | SbbCalendarDayElement)[] {
    return (
      (this._calendarView === 'day'
        ? Array.from(
            this._getRootForQuerySelector().querySelectorAll<SbbCalendarDayElement>(
              'sbb-calendar-day',
            ),
          )
        : Array.from(
            this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.sbb-calendar__cell'),
          )) ?? []
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

  @state()
  private accessor _initialized = false;

  private _language = new SbbLanguageController(this).withHandler(() => {
    this._monthNames = this._dateAdapter.getMonthNames('long');
    this._createMonthRows();
  });
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryBreakpointLargeAndAbove]: () => this._init(),
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
    this.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).localName === 'sbb-calendar-day') {
        this._selectDate((e.target as SbbCalendarDayElement).value! as T);
      }
    });
    this.addEventListener('keydown', (e) => {
      if ((e.target as HTMLElement).localName === 'sbb-calendar-day') {
        this._handleKeyboardEvent(
          e,
          this.mapDateToDay((e.target as SbbCalendarDayElement).value! as T),
        );
      }
    });
  }

  private _getRootForQuerySelector(): this | ShadowRoot {
    return this._enhancedVariant ? this : this.shadowRoot!;
  }

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

    if (changedProperties.has('wide') || changedProperties.has('orientation')) {
      this.resetPosition();
    }

    if (changedProperties.has('view')) {
      this._setChosenYear();
      this._chosenMonth = undefined;
      this._nextCalendarView = this._calendarView = this.view;
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

  private _onSlotChange = (): void => {
    // fixme handle case of removal of all days
    if (!this._enhancedVariant) {
      this._enhancedVariant = true;
    }
    this._setTabIndex();
  };

  /**
   * The `_selected` state should be adapted when the `multiple` property changes:
   *   - if it changes to true, the '_selected' is set to an array;
   *   - if it changes to false, the first available option is set as 'value' otherwise it's set to null.
   */
  private _onMultipleChanged(isMultiple: boolean): void {
    if (isMultiple && !Array.isArray(this._selected)) {
      this._selected = this._selected ? [this._selected as T] : [];
    }
    if (!isMultiple && Array.isArray(this._selected)) {
      this._selected = (this._selected as T[]).length ? (this._selected as T[])[0] : null;
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
    this._wide =
      (this._mediaMatcher.matches(SbbMediaQueryBreakpointLargeAndAbove) ?? false) && this.wide;
    this._weeks = this._createWeekRows(this._activeDate);
    this._years = this._createYearRows();
    this._weekNumbers = this._createWeekNumbers(this._activeDate);
    this._nextMonthWeeks = [[]];
    this._nextMonthYears = [[]];
    if (this._wide) {
      const nextMonthDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
      this._nextMonthWeeks = this._createWeekRows(nextMonthDate, true);
      this._nextMonthYears = this._createYearRows(YEARS_PER_PAGE);
      this._nextMonthWeekNumbers = this._createWeekNumbers(nextMonthDate);
    }
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

  /**
   * Given a date, it returns the week numbers for the month the date belongs to.
   * TODO: check if date-fns can be replaced with custom logic.
   *
   * Since the calculation is not simple (see https://en.wikipedia.org/wiki/Week#Numbering),
   * the date-fns library has been used this way:
   * the first and the last day of the month are calculated and then passed to the `eachWeekOfInterval` function,
   * which returns an array containing the starting day of every ISO week of the month,
   * considering Monday as the first day.
   * Then, this array is mapped via the `getWeek` function, which returns the ISO week number for that date.
   */
  private _createWeekNumbers(date: T): number[] {
    return eachWeekOfInterval(
      { start: startOfMonth(date as Date), end: endOfMonth(date as Date) },
      { weekStartsOn: 1 },
    ).map((firstDayOfWeek: Date) =>
      getWeek(firstDayOfWeek, { weekStartsOn: 1, firstWeekContainsDate: 4 }),
    );
  }

  /** Creates the rows along the horizontal direction and sets the parameters used in keyboard navigation. */
  private _createWeekRows(value: T, isSecondMonthInView = false): Day<T>[][] {
    const daysInMonth: number = this._dateAdapter.getNumDaysInMonth(value);
    const weekOffset: number = this._dateAdapter.getFirstWeekOffset(value);
    if (!isSecondMonthInView) {
      this._keyboardNavigationDayViewParameters.firstMonthLength = daysInMonth;
      this._keyboardNavigationDayViewParameters.firstMonthOffset = weekOffset;
      this._keyboardNavigationDayViewParameters.firstDayInView = this._dateAdapter.toIso8601(
        this._dateAdapter.createDate(
          this._dateAdapter.getYear(value),
          this._dateAdapter.getMonth(value),
          1,
        ),
      );
      this._keyboardNavigationDayViewParameters.lastDayInView = this._dateAdapter.toIso8601(
        this._dateAdapter.createDate(
          this._dateAdapter.getYear(value),
          this._dateAdapter.getMonth(value),
          daysInMonth,
        ),
      );
    } else {
      this._keyboardNavigationDayViewParameters.secondMonthOffset = weekOffset;
      this._keyboardNavigationDayViewParameters.lastDayInView = this._dateAdapter.toIso8601(
        this._dateAdapter.createDate(
          this._dateAdapter.getYear(value),
          this._dateAdapter.getMonth(value),
          daysInMonth,
        ),
      );
    }
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
      weeks[weeks.length - 1].push(this.mapDateToDay(date));
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
      weeks[cell].push(this.mapDateToDay(date));
    }
    return weeks;
  }

  protected mapDateToDay(date: T): Day<T> {
    const isoDate = this._dateAdapter.toIso8601(date);
    return {
      value: isoDate,
      dateValue: date,
      dayValue: String(this._dateAdapter.getDate(date)),
      monthValue: String(this._dateAdapter.getMonth(date)),
      yearValue: String(this._dateAdapter.getYear(date)),
      weekValue: getWeek(isoDate, { weekStartsOn: 1, firstWeekContainsDate: 4 }),
      weekDayValue: this._dateAdapter.getDayOfWeek(date),
    };
  }

  /** Force the conversion to ISO8601 formatted string. */
  private _mapValueToISODate(value: string | Date): string {
    return typeof value === 'string' ? value : this._dateAdapter.toIso8601(value as T);
  }

  /** Creates the rows for the month selection view. */
  private _createMonthRows(): void {
    const shortNames: string[] = this._dateAdapter.getMonthNames('short');
    const months: Month[] = new Array(12).fill(null).map(
      (_, i: number): Month => ({
        value: shortNames[i],
        longValue: this._monthNames[i],
        monthValue: i + 1,
      }),
    );
    const rows: number = 12 / MONTHS_PER_ROW;
    const monthArray: Month[][] = [];
    for (let i: number = 0; i < rows; i++) {
      monthArray.push(months.slice(MONTHS_PER_ROW * i, MONTHS_PER_ROW * (i + 1)));
    }
    this._months = monthArray;
  }

  /** Creates the rows for the year selection view. */
  private _createYearRows(offset: number = 0): number[][] {
    const startValueYearView: number = this._getStartValueYearView();
    const allYears: number[] = new Array(YEARS_PER_PAGE)
      .fill(0)
      .map((_, i: number) => startValueYearView + offset + i);
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

  /** Checks if date is within the min-max range in month view. */
  private _isMonthInRange(month: number, year: number): boolean {
    if (!this.min && !this.max) {
      return true;
    }

    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this.min) &&
      (year < this._dateAdapter.getYear(this.min!) ||
        (year === this._dateAdapter.getYear(this.min!) &&
          month < this._dateAdapter.getMonth(this.min!)));

    const isAfterMax: boolean =
      this._dateAdapter.isValid(this.max) &&
      (year > this._dateAdapter.getYear(this.max!) ||
        (year === this._dateAdapter.getYear(this.max!) &&
          month > this._dateAdapter.getMonth(this.max!)));

    return !(isBeforeMin || isAfterMax);
  }

  /** Checks if date is within the min-max range in year view. */
  private _isYearInRange(year: number): boolean {
    if (!this.min && !this.max) {
      return true;
    }
    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this.min) && this._dateAdapter.getYear(this.min!) > year;
    const isAfterMax: boolean =
      this._dateAdapter.isValid(this.max) && this._dateAdapter.getYear(this.max!) < year;
    return !(isBeforeMin || isAfterMax);
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/year-view.ts#L366
  private _isMonthFilteredOut(month: number, year: number): boolean {
    if (!this.dateFilter) {
      return true;
    }

    const firstOfMonth = this._dateAdapter.createDate(year, month, 1)!;
    for (
      let date: T = firstOfMonth;
      this._dateAdapter.getMonth(date) == month;
      date = this._dateAdapter.addCalendarDays(date, 1)
    ) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/multi-year-view.ts#L351
  private _isYearFilteredOut(year: number): boolean {
    if (!this.dateFilter) {
      return true;
    }

    const firstOfYear = this._dateAdapter.createDate(year, 1, 1)!;
    for (
      let date: T = firstOfYear;
      this._dateAdapter.getYear(date) == year;
      date = this._dateAdapter.addCalendarDays(date, 1)
    ) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /** Emits the selected date and sets it internally. */
  private _selectDate(day: T): void {
    this._chosenMonth = undefined;
    this._setChosenYear();
    if (this.multiple) {
      // Check if _selected has elements
      if (this._selected && (this._selected as T[]).length > 0) {
        const indexOfSelectedDay: number = (this._selected as T[]).findIndex(
          (sel) => this._dateAdapter.compareDate(sel, day) === 0,
        );
        // If the selected date is already in the _selected array, remove it, otherwise add it
        if (indexOfSelectedDay !== -1) {
          this._selected = (this._selected as T[]).filter((_, i) => i !== indexOfSelectedDay);
        } else {
          this._selected = [...(this._selected as T[]), day];
        }
      } else {
        // If _selected is empty, set it
        this._selected = [day];
      }
      this._emitDateSelectedEvent(this._selected.map((e) => this._dateAdapter.deserialize(e)!));
    } else {
      // In single selection, check if the day is already selected
      if (!this._selected || this._dateAdapter.compareDate(this._selected as T, day) !== 0) {
        this._selected = day;
        this._emitDateSelectedEvent(this._dateAdapter.deserialize(day)!);
      }
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
    // Filter disabled days by matching the provided `days` parameter against the enabled cells.
    // Since the buttons' value is set to the Day's interface value (ISO string), there's no need to deserialize it.
    const enabledDays: string[] = this._cells
      .filter((e) => !e.disabled)
      .map((e) => this._mapValueToISODate(e.value!));
    const daysToAdd: string[] = days
      .map((e: Day<T>) => e.value)
      .filter((isoDate: string) => enabledDays.includes(isoDate));
    const daysToAddSet = new Set(daysToAdd);
    const selectedSet = new Set((this._selected as T[]).map((s) => this._dateAdapter.toIso8601(s)));
    const selStrings = this._updateSelectedWithMultipleDates(daysToAdd, daysToAddSet, selectedSet);
    this._selected = selStrings.map((s) => this._dateAdapter.deserialize(s)!);

    this._emitDateSelectedEvent(this._selected.map((e) => this._dateAdapter.deserialize(e)!));
  }

  /**
   * Emits the dateselected event given the detail (as T or T[] based on the value of the multiple flag).
   */
  private _emitDateSelectedEvent(detail: T | T[]): void {
    /** @type {CustomEvent<T | T[]>} Event emitted on date selection. */
    this.dispatchEvent(
      new CustomEvent<T | T[]>('dateselected', {
        detail,
        composed: true,
        bubbles: true,
      }),
    );
  }

  private _emitMonthChange(): void {
    // FIXME: the name of this variable appears as event name in the readme
    //  due to a bug in the custom-elements-manifest library.
    //  https://github.com/open-wc/custom-elements-manifest/issues/149
    const monthchange = (this.wide ? [...this._weeks, ...this._nextMonthWeeks] : this._weeks)
      .flat()
      .sort((a, b) => a.value.localeCompare(b.value));
    /**
     * @type {SbbMonthChangeEvent}
     * Emits when the month changes.
     * The `range` property contains the days array of the chosen month.
     */
    this.dispatchEvent(new SbbMonthChangeEvent(monthchange));
  }

  /**
   * In case of multiple selection, newly added days must be added to the existing ones, without duplication.
   * If the days to add are exactly the same as the selected ones, the set must be emptied.
   */
  private _updateSelectedWithMultipleDates(
    daysToAdd: string[],
    daysToAddSet: Set<string>,
    selectedSet: Set<string>,
  ): string[] {
    if (daysToAdd.every((day: string) => selectedSet.has(day))) {
      daysToAddSet.forEach((day: string) => selectedSet.delete(day));
    } else {
      daysToAddSet.forEach((day: string) => selectedSet.add(day));
    }
    return Array.from(selectedSet);
  }

  private _setChosenYear(): void {
    if (this.view === 'month') {
      let selectedDate: T | undefined;
      if (this.multiple) {
        selectedDate = (this.selected as T[]).at(-1);
      } else {
        selectedDate = this.selected as T;
      }
      this._chosenYear = this._dateAdapter.getYear(selectedDate ?? this._dateAdapter.today());
    } else {
      this._chosenYear = undefined;
    }
  }

  private _assignActiveDate(date: T): void {
    if (this.min && this._dateAdapter.compareDate(this.min, date) > 0) {
      this._activeDate = this.min;
      return;
    }
    if (this.max && this._dateAdapter.compareDate(this.max, date) < 0) {
      this._activeDate = this.max;
      return;
    }
    this._activeDate = date;
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
    let nextMonth = this._dateAdapter.addCalendarMonths(this._activeDate, this._wide ? 2 : 1);
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
      this._dateAdapter.getYear(this._activeDate) + (this._wide ? 2 : 1),
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
    const years = this._wide ? this._nextMonthYears : this._years;
    const lastYearRange = years[years.length - 1];
    const lastYear = lastYearRange[lastYearRange.length - 1];
    const nextYear = this._dateAdapter.createDate(lastYear + 1, 1, 1);
    return this._nextDisabled(nextYear);
  }

  private _handleTableBlur(eventTarget: HTMLElement): void {
    if (eventTarget?.localName !== 'sbb-calendar-day') {
      this._setTabIndex();
    }
  }

  private _setTabIndex(): void {
    const query = this._calendarView === 'day' ? 'sbb-calendar-day' : '.sbb-calendar__cell';
    Array.from(
      this._getRootForQuerySelector().querySelectorAll(`${query}[tabindex="0"]`) ?? [],
    ).forEach((day) => ((day as HTMLButtonElement | SbbCalendarDayElement).tabIndex = -1));
    const firstFocusable = this._getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  /** Get the element in the calendar to assign focus. */
  private _getFirstFocusable(): SbbCalendarDayElement | HTMLButtonElement | null {
    const root = this._getRootForQuerySelector();
    if (this._calendarView === 'day') {
      const selectedOrCurrent =
        root.querySelector<SbbCalendarDayElement>(':state(selected)') ??
        root.querySelector<SbbCalendarDayElement>(':state(current)');
      return selectedOrCurrent && !selectedOrCurrent.disabled
        ? selectedOrCurrent
        : this._getFirstFocusableDay();
    } else {
      const selectedOrCurrent = this.shadowRoot?.querySelector<HTMLButtonElement>(
        '.sbb-calendar__cell-current',
      );
      return selectedOrCurrent && !selectedOrCurrent.disabled
        ? selectedOrCurrent
        : this.shadowRoot!.querySelector<HTMLButtonElement>('.sbb-calendar__cell:not([disabled])');
    }
  }

  /**
   * In `day` view in `vertical` orientation,
   * if the first of the month is not a Monday, it is not the first rendered element in the table,
   * so `this.shadowRoot!.querySelector('.sbb-calendar__cell:not([disabled])')` will return a wrong value.
   *
   * To solve this, the element with the lowest `value` is taken (ISO String are ordered).
   */
  private _getFirstFocusableDay(): SbbCalendarDayElement | null {
    const daysInView: SbbCalendarDayElement[] = Array.from(
      this._getRootForQuerySelector().querySelectorAll('sbb-calendar-day:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      const firstElement = daysInView
        .map((e: SbbCalendarDayElement): string => this._dateAdapter.toIso8601(e.value! as T))
        .sort()[0];
      return this._getRootForQuerySelector().querySelector(
        `sbb-calendar-day[slot="${firstElement}"]`,
      );
    }
  }

  private _handleKeyboardEvent(event: KeyboardEvent, day?: Day<T>): void {
    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
    }
    // Gets the currently rendered table's cell;
    // they could be days, months or years based on the current selection view.
    // If `wide` is true, years are doubled in number and days are (roughly) doubled too, affecting the `index` calculation.
    const cells = this._cells;
    const index: number = cells.findIndex((e) => e === event.target);
    let nextEl: HTMLButtonElement | SbbCalendarDayElement;
    if (day) {
      nextEl = this._navigateByKeyboardDayView(event, index, cells, day);
    } else {
      nextEl = this._navigateByKeyboard(event, index, cells as HTMLButtonElement[]);
    }
    const activeEl = (this._enhancedVariant ? document : this.shadowRoot!).activeElement as
      | HTMLButtonElement
      | SbbCalendarDayElement;
    if (nextEl !== activeEl) {
      nextEl.tabIndex = 0;
      nextEl?.focus();
      activeEl.tabIndex = -1;
    }
  }

  private _navigateByKeyboardDayView(
    evt: KeyboardEvent,
    index: number,
    cells: (HTMLButtonElement | SbbCalendarDayElement)[],
    day: Day<T>,
  ): HTMLButtonElement | SbbCalendarDayElement {
    const arrowsOffset =
      this.orientation === 'horizontal'
        ? { leftRight: 1, upDown: DAYS_PER_ROW }
        : { leftRight: DAYS_PER_ROW, upDown: 1 };
    const offsetForVertical: number =
      index < this._keyboardNavigationDayViewParameters.firstMonthLength
        ? this._keyboardNavigationDayViewParameters.firstMonthOffset
        : this._keyboardNavigationDayViewParameters.secondMonthOffset;

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
    return (
      date < this._keyboardNavigationDayViewParameters.firstDayInView! ||
      date > this._keyboardNavigationDayViewParameters.lastDayInView!
    );
  }

  private _findDayArrows(
    cells: (HTMLButtonElement | SbbCalendarDayElement)[],
    index: number,
    date: T,
    delta: number,
  ): HTMLButtonElement | SbbCalendarDayElement {
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
    cells: (HTMLButtonElement | SbbCalendarDayElement)[],
    index: number,
    day: Day<T>,
    delta: number,
    deltaIfDisabled: number,
  ): HTMLButtonElement | SbbCalendarDayElement {
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
    cells: (HTMLButtonElement | SbbCalendarDayElement)[],
    index: number,
    day: Day<T>,
    date: number,
  ): HTMLButtonElement | SbbCalendarDayElement {
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
    cells: (HTMLButtonElement | SbbCalendarDayElement)[],
    index: number,
    firstNextMonth: T,
  ): HTMLButtonElement | SbbCalendarDayElement {
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
    cells: HTMLButtonElement[],
  ): HTMLButtonElement {
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
  private _findNext(days: HTMLButtonElement[], index: number, delta: number): HTMLButtonElement {
    let nextIndex = index + delta;
    while (nextIndex < days.length && days[nextIndex]?.disabled) {
      nextIndex += delta;
    }
    return days[nextIndex] ?? days[index];
  }

  /** Find the first enabled element in the provided array. */
  private _findFirst(days: HTMLButtonElement[], firstOfCurrentMonth: number): HTMLButtonElement {
    return !days[firstOfCurrentMonth].disabled
      ? days[firstOfCurrentMonth]
      : this._findNext(days, firstOfCurrentMonth, 1);
  }

  /** Find the last enabled element in the provided array. */
  private _findLast(days: HTMLButtonElement[], lastOfCurrentMonth: number): HTMLButtonElement {
    return !days[lastOfCurrentMonth].disabled
      ? days[lastOfCurrentMonth]
      : this._findNext(days, lastOfCurrentMonth, -1);
  }

  /** Find the first enabled element in the same column of the provided array. */
  private _findFirstOnColumn(
    days: HTMLButtonElement[],
    index: number,
    offset: number,
    verticalOffset: number,
  ): HTMLButtonElement {
    const nextIndex = (index % verticalOffset) + offset;
    return !days[nextIndex].disabled
      ? days[nextIndex]
      : this._findNext(days, nextIndex, verticalOffset);
  }

  /** Find the last enabled element in the same column of the provided array. */
  private _findLastOnColumn(
    days: HTMLButtonElement[],
    index: number,
    offset: number,
    verticalOffset: number,
  ): HTMLButtonElement {
    const nextIndex = index + Math.trunc((offset - index - 1) / verticalOffset) * verticalOffset;
    return !days[nextIndex].disabled
      ? days[nextIndex]
      : this._findNext(days, nextIndex, -verticalOffset);
  }

  private _resetCalendarViewAndEmitMonthChange(initTransition = false): void {
    this._resetCalendarView(initTransition);
    this._emitMonthChange();
  }

  private _resetCalendarView(initTransition = false): void {
    if (this._containingFocus) {
      this._resetFocus = true;
    }
    this._activeDate =
      (this.multiple ? (this._selected as T[]).at(-1) : (this._selected as T)) ??
      this._dateAdapter.today();
    this._setChosenYear();
    this._chosenMonth = undefined;
    this._init();
    this._nextCalendarView = this._calendarView = this.view;

    if (initTransition) {
      this._startTableTransition();
    }
  }

  /** Render the view for the day selection. */
  private _renderDayView(): TemplateResult {
    const nextMonthActiveDate = this._wide
      ? this._dateAdapter.addCalendarMonths(this._activeDate, 1)
      : undefined;
    return html`
      <div class="sbb-calendar__controls">
        ${this._getArrow(
          'left',
          () => this._goToDifferentMonth(-1),
          i18nPreviousMonth[this._language.current],
          this._previousMonthDisabled(),
        )}
        <div class="sbb-calendar__controls-month">
          ${this._createLabelForDayView(this._activeDate)}
          ${this._wide ? this._createLabelForDayView(nextMonthActiveDate!) : nothing}
          <sbb-screen-reader-only role="status">
            ${this._createAriaLabelForDayView(this._activeDate, nextMonthActiveDate!)}
          </sbb-screen-reader-only>
        </div>
        ${this._getArrow(
          'right',
          () => this._goToDifferentMonth(1),
          i18nNextMonth[this._language.current],
          this._nextMonthDisabled(),
        )}
      </div>
      <div class="sbb-calendar__table-overflow-break">
        <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
          ${this.orientation === 'horizontal'
            ? html`
                ${this._createDayTable(this._weeks, this._weekNumbers)}
                ${this._wide
                  ? this._createDayTable(this._nextMonthWeeks, this._nextMonthWeekNumbers, true)
                  : nothing}
              `
            : html`
                ${this._createDayTableVertical(this._weeks, this._weekNumbers)}
                ${this._wide
                  ? this._createDayTableVertical(
                      this._nextMonthWeeks,
                      this._nextMonthWeekNumbers,
                      nextMonthActiveDate,
                    )
                  : nothing}
              `}
        </div>
      </div>
    `;
  }

  /** Creates the label with the month for the daily view. */
  private _createLabelForDayView(d: T): TemplateResult {
    const monthLabel = `${
      this._monthNames[this._dateAdapter.getMonth(d) - 1]
    } ${this._dateAdapter.getYear(d)}`;
    return html`
      <button
        type="button"
        class="sbb-calendar__date-selection sbb-calendar__controls-change-date"
        aria-label="${i18nYearMonthSelection[this._language.current]} ${monthLabel}"
        @click=${() => {
          this._resetFocus = true;
          this._nextCalendarView = 'year';
          this._startTableTransition();
        }}
      >
        ${monthLabel}
        <sbb-icon name="chevron-small-down-small"></sbb-icon>
      </button>
    `;
  }

  /** Creates the aria-label for the daily view. */
  private _createAriaLabelForDayView(...dates: T[]): string {
    let monthLabel = '';
    for (const d of dates) {
      if (d) {
        monthLabel += `${
          this._monthNames[this._dateAdapter.getMonth(d) - 1]
        } ${this._dateAdapter.getYear(d)} `;
      }
    }
    return monthLabel;
  }

  /** Creates the calendar table for the daily view. */
  private _createDayTable(
    weeks: Day<T>[][],
    weekNumbers: number[],
    isWideNextMonth: boolean = false,
  ): TemplateResult {
    const weeksForSelectMultipleWeekNumbers: Day<T>[] = (
      this._wide
        ? [...this._weeks, ...this._nextMonthWeeks]
        : isWideNextMonth
          ? this._nextMonthWeeks
          : this._weeks
    ).flat();
    const weeksForSelectMultipleWeekDays: Day<T>[] = (
      isWideNextMonth ? this._nextMonthWeeks : this._weeks
    ).flat();
    return html`
      <table
        class="sbb-calendar__table"
        @focusout=${(event: FocusEvent) =>
          this._handleTableBlur(event.relatedTarget as HTMLElement)}
        @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
      >
        <thead class="sbb-calendar__table-header">
          <tr>
            ${this.weekNumbers ? html`<th class="sbb-calendar__table-header-cell"></th>` : nothing}
            ${this._weekdays.map(
              (day: Weekday, index: number) => html`
                <th class="sbb-calendar__table-header-cell">
                  ${this.multiple
                    ? html`
                        <button
                          class="sbb-calendar__header-cell sbb-calendar__weekday"
                          aria-label=${day.long}
                          @click=${() => {
                            // NOTE: Sundays have index 7, while their weekDayValue is 0
                            const days: Day<T>[] = weeksForSelectMultipleWeekDays.filter(
                              (day: Day<T>) => day.weekDayValue === (index + 1) % 7,
                            )!;
                            this._selectMultipleDates(days);
                          }}
                        >
                          ${day.narrow}
                        </button>
                      `
                    : html`
                        <sbb-screen-reader-only>${day.long}</sbb-screen-reader-only>
                        <span aria-hidden="true">${day.narrow}</span>
                      `}
                </th>
              `,
            )}
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          ${weeks.map((week: Day<T>[], rowIndex: number) => {
            const firstRowOffset: number = DAYS_PER_ROW - week.length;
            if (rowIndex === 0 && firstRowOffset) {
              return html`
                <tr>
                  ${this.weekNumbers
                    ? html`
                        <td class="sbb-calendar__table-header-cell">
                          ${this.multiple
                            ? html`
                                <button
                                  class="sbb-calendar__header-cell sbb-calendar__weekday"
                                  aria-label=${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumbers[0]}`}
                                  @click=${() => {
                                    const days: Day<T>[] = weeksForSelectMultipleWeekNumbers.filter(
                                      (day: Day<T>) => day.weekValue === weekNumbers[0],
                                    )!;
                                    this._selectMultipleDates(days);
                                  }}
                                >
                                  ${weekNumbers[0]}
                                </button>
                              `
                            : html`
                                <sbb-screen-reader-only
                                  >${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumbers[0]}`}</sbb-screen-reader-only
                                >
                                <span aria-hidden="true">${weekNumbers[0]}</span>
                              `}
                        </td>
                      `
                    : nothing}
                  ${[...Array(firstRowOffset).keys()].map(
                    () => html`<td class="sbb-calendar__table-data"></td>`,
                  )}
                  ${this._createDayCells(week)}
                </tr>
              `;
            }
            return html`
              <tr>
                ${this.weekNumbers
                  ? html`
                      <td class="sbb-calendar__table-header-cell">
                        ${this.multiple
                          ? html`
                              <button
                                class="sbb-calendar__header-cell sbb-calendar__weekday"
                                aria-label=${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumbers[rowIndex]}`}
                                @click=${() => {
                                  const days: Day<T>[] = weeksForSelectMultipleWeekNumbers.filter(
                                    (day: Day<T>) => day.weekValue === weekNumbers[rowIndex],
                                  )!;
                                  this._selectMultipleDates(days);
                                }}
                              >
                                ${weekNumbers[rowIndex]}
                              </button>
                            `
                          : html`
                              <sbb-screen-reader-only
                                >${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumbers[rowIndex]}`}</sbb-screen-reader-only
                              >
                              <span aria-hidden="true">${weekNumbers[rowIndex]}</span>
                            `}
                      </td>
                    `
                  : nothing}
                ${this._createDayCells(week)}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  /** Creates the table in orientation='vertical'. */
  private _createDayTableVertical(
    weeks: Day<T>[][],
    weekNumbers: number[],
    nextMonthActiveDate?: T,
  ): TemplateResult {
    const weekOffset = this._dateAdapter.getFirstWeekOffset(
      nextMonthActiveDate ?? this._activeDate,
    );
    const weeksForSelectMultipleWeekNumbers: Day<T>[] = (
      this._wide
        ? [...this._weeks, ...this._nextMonthWeeks]
        : nextMonthActiveDate
          ? this._nextMonthWeeks
          : this._weeks
    ).flat();
    return html`
      <table
        class="sbb-calendar__table"
        @focusout=${(event: FocusEvent) =>
          this._handleTableBlur(event.relatedTarget as HTMLElement)}
        @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
      >
        ${this.weekNumbers
          ? html`
              <thead class="sbb-calendar__table-header">
                <tr>
                  ${nextMonthActiveDate
                    ? nothing
                    : html`<th class="sbb-calendar__table-data"></th>`}
                  ${weekNumbers.map(
                    (weekNumber: number) => html`
                      <th class="sbb-calendar__table-header-cell">
                        ${this.multiple
                          ? html`
                              <button
                                class="sbb-calendar__header-cell sbb-calendar__weekday"
                                aria-label=${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumber}`}
                                @click=${() => {
                                  const days: Day<T>[] = weeksForSelectMultipleWeekNumbers.filter(
                                    (day: Day<T>) => day.weekValue === weekNumber,
                                  )!;
                                  this._selectMultipleDates(days);
                                }}
                              >
                                ${weekNumber}
                              </button>
                            `
                          : html`
                              <sbb-screen-reader-only
                                >${`${i18nCalendarWeekNumber[this._language.current]} ${weekNumber}`}</sbb-screen-reader-only
                              >
                              <span aria-hidden="true">${weekNumber}</span>
                            `}
                      </th>
                    `,
                  )}
                </tr>
              </thead>
            `
          : nothing}
        <tbody class="sbb-calendar__table-body">
          ${weeks.map((week: Day<T>[], rowIndex: number) => {
            const weekday = this._weekdays[rowIndex];
            const selectableDays = this._wide ? [...week, ...this._nextMonthWeeks[rowIndex]] : week;
            return html`
              <tr>
                ${nextMonthActiveDate
                  ? nothing
                  : html`
                      <td class="sbb-calendar__table-header-cell">
                        ${this.multiple
                          ? html`
                              <button
                                class="sbb-calendar__header-cell sbb-calendar__weekday"
                                aria-label=${weekday.long}
                                @click=${() => this._selectMultipleDates(selectableDays)}
                              >
                                ${weekday.narrow}
                              </button>
                            `
                          : html`
                              <sbb-screen-reader-only>${weekday.long}</sbb-screen-reader-only>
                              <span aria-hidden="true">${weekday.narrow}</span>
                            `}
                      </td>
                    `}
                ${rowIndex < weekOffset
                  ? html`<td class="sbb-calendar__table-data"></td>`
                  : nothing}
                ${this._createDayCells(week)}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  /** Creates the cells for the daily view. */
  private _createDayCells(week: Day<T>[]): TemplateResult[] {
    return week.map((day: Day<T>) => {
      return html`
        <td>
          <slot name=${day.value}>
            <sbb-calendar-day
              slot=${day.value}
              @click=${() => this._selectDate(day.dateValue)}
              @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt, day)}
              sbb-popover-close
            ></sbb-calendar-day>
          </slot>
        </td>
      `;
    });
  }

  /** Render the view for the month selection. */
  private _renderMonthView(): TemplateResult {
    return html`
      <div class="sbb-calendar__controls">
        ${this._getArrow(
          'left',
          () => this._goToDifferentYear(-1),
          i18nPreviousYear[this._language.current],
          this._previousYearDisabled(),
        )}
        <div class="sbb-calendar__controls-month">${this._createLabelForMonthView()}</div>
        ${this._getArrow(
          'right',
          () => this._goToDifferentYear(1),
          i18nNextYear[this._language.current],
          this._nextYearDisabled(),
        )}
      </div>
      <div class="sbb-calendar__table-overflow-break">
        <div class="sbb-calendar__table-container sbb-calendar__table-month-view">
          ${this._createMonthTable(this._months, this._chosenYear!)}
          ${this._wide ? this._createMonthTable(this._months, this._chosenYear! + 1) : nothing}
        </div>
      </div>
    `;
  }

  /** Creates the label with the year for the monthly view. */
  private _createLabelForMonthView(): TemplateResult {
    return html` <button
        type="button"
        id="sbb-calendar__month-selection"
        class="sbb-calendar__controls-change-date"
        aria-label=${`${i18nCalendarDateSelection[this._language.current]} ${this._chosenYear}`}
        @click=${() => this._resetCalendarViewAndEmitMonthChange(true)}
      >
        ${this._chosenYear} ${this._wide ? ` - ${this._chosenYear! + 1}` : nothing}
        <sbb-icon name="chevron-small-up-small"></sbb-icon>
      </button>
      <sbb-screen-reader-only role="status"> ${this._chosenYear} </sbb-screen-reader-only>`;
  }

  /** Creates the table for the month selection view. */
  private _createMonthTable(months: Month[][], year: number): TemplateResult {
    return html`
      <table
        class="sbb-calendar__table"
        @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
      >
        ${this._wide
          ? html`<thead class="sbb-calendar__table-header" aria-hidden="true">
              <tr>
                <th class="sbb-calendar__table-header-cell" colspan=${MONTHS_PER_ROW}>${year}</th>
              </tr>
            </thead>`
          : nothing}
        <tbody class="sbb-calendar__table-body">
          ${months.map(
            (row: Month[]) => html`
              <tr>
                ${row.map((month: Month) => {
                  let selected: boolean;
                  if (this.multiple) {
                    selected =
                      (this._selected as T[]).find(
                        (date: T) =>
                          year === this._dateAdapter.getYear(date) &&
                          month.monthValue === this._dateAdapter.getMonth(date),
                      ) !== undefined;
                  } else {
                    const selectedMonth = this._selected
                      ? this._dateAdapter.getMonth(this._selected as T)
                      : undefined;
                    const selectedYear = this._selected
                      ? this._dateAdapter.getYear(this._selected as T)
                      : undefined;
                    selected =
                      !!this._selected &&
                      year === selectedYear &&
                      month.monthValue === selectedMonth;
                  }
                  const isOutOfRange = !this._isMonthInRange(month.monthValue, year);
                  const isFilteredOut = !this._isMonthFilteredOut(month.monthValue, year);
                  const isCurrentMonth =
                    year === this._dateAdapter.getYear(this._dateAdapter.today()) &&
                    this._dateAdapter.getMonth(this._dateAdapter.today()) === month.monthValue;

                  return html` <td
                    class=${classMap({
                      'sbb-calendar__table-data': true,
                      'sbb-calendar__table-month': true,
                    })}
                  >
                    <button
                      class=${classMap({
                        'sbb-calendar__cell': true,
                        'sbb-calendar__pill': true,
                        'sbb-calendar__cell-current': isCurrentMonth,
                        'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
                        'sbb-calendar__selected': selected,
                      })}
                      @click=${() => this._onMonthSelection(month.monthValue, year)}
                      ?disabled=${isOutOfRange || isFilteredOut}
                      aria-label=${`${month.longValue} ${year}`}
                      aria-pressed=${selected}
                      aria-disabled=${String(isOutOfRange || isFilteredOut)}
                      tabindex="-1"
                      data-month=${month.monthValue || nothing}
                      @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
                    >
                      ${month.value}
                    </button>
                  </td>`;
                })}
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }

  /** Select the month and change the view to day selection. */
  private _onMonthSelection(month: number, year: number): void {
    this._chosenMonth = month;
    this._nextCalendarView = 'day';
    this._init(
      this._dateAdapter.createDate(
        year,
        this._chosenMonth,
        this._dateAdapter.getDate(this._activeDate),
      ),
    );
    this._startTableTransition();
    this._emitMonthChange();
  }

  /** Render the view for the year selection. */
  private _renderYearView(): TemplateResult {
    return html`
      <div class="sbb-calendar__controls">
        ${this._getArrow(
          'left',
          () => this._goToDifferentYearRange(-YEARS_PER_PAGE),
          i18nPreviousYearRange(YEARS_PER_PAGE)[this._language.current],
          this._previousYearRangeDisabled(),
        )}
        <div class="sbb-calendar__controls-month">${this._createLabelForYearView()}</div>
        ${this._getArrow(
          'right',
          () => this._goToDifferentYearRange(YEARS_PER_PAGE),
          i18nNextYearRange(YEARS_PER_PAGE)[this._language.current],
          this._nextYearRangeDisabled(),
        )}
      </div>
      <div class="sbb-calendar__table-overflow-break">
        <div class="sbb-calendar__table-container sbb-calendar__table-year-view">
          ${this._createYearTable(this._years)}
          ${this._wide ? this._createYearTable(this._nextMonthYears, true) : nothing}
        </div>
      </div>
    `;
  }

  /** Creates the button arrow for all the views. */
  private _getArrow(
    direction: 'left' | 'right',
    click: () => void,
    ariaLabel: string,
    disabled: boolean,
  ): TemplateResult {
    return html`<sbb-secondary-button
      size="m"
      icon-name="chevron-small-${direction}-small"
      aria-label=${ariaLabel}
      @click=${click}
      ?disabled=${disabled}
      id="sbb-calendar__controls-${direction === 'left' ? 'previous' : 'next'}"
    ></sbb-secondary-button>`;
  }

  /** Creates the label with the year range for the yearly view. */
  private _createLabelForYearView(): TemplateResult {
    const firstYear: number = this._years.flat()[0];
    const lastYearArray: number[] = (this._wide ? this._nextMonthYears : this._years).flat();
    const lastYear: number = lastYearArray[lastYearArray.length - 1];
    const yearLabel = `${firstYear} - ${lastYear}`;
    return html`
      <button
        type="button"
        id="sbb-calendar__year-selection"
        class="sbb-calendar__controls-change-date"
        aria-label="${i18nCalendarDateSelection[this._language.current]} ${yearLabel}"
        @click=${() => this._resetCalendarViewAndEmitMonthChange(true)}
      >
        ${yearLabel}
        <sbb-icon name="chevron-small-up-small"></sbb-icon>
      </button>
      <sbb-screen-reader-only role="status"> ${yearLabel} </sbb-screen-reader-only>
    `;
  }

  /** Creates the table for the year selection view. */
  private _createYearTable(years: number[][], shiftRight = false): TemplateResult {
    const now = this._dateAdapter.today();
    return html` <table
      class="sbb-calendar__table"
      @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
    >
      <tbody class="sbb-calendar__table-body">
        ${years.map(
          (row: number[]) =>
            html` <tr>
              ${row.map((year: number) => {
                let selected: boolean;
                if (this.multiple) {
                  selected =
                    (this._selected as T[]).find(
                      (date: T) => year === this._dateAdapter.getYear(date),
                    ) !== undefined;
                } else {
                  const selectedYear = this._selected
                    ? this._dateAdapter.getYear(this._selected as T)
                    : undefined;
                  selected = !!this._selected && year === selectedYear;
                }
                const isOutOfRange = !this._isYearInRange(year);
                const isFilteredOut = !this._isYearFilteredOut(year);
                const isCurrentYear = this._dateAdapter.getYear(now) === year;
                return html` <td class="sbb-calendar__table-data sbb-calendar__table-year">
                  <button
                    class=${classMap({
                      'sbb-calendar__cell': true,
                      'sbb-calendar__pill': true,
                      'sbb-calendar__cell-current': isCurrentYear,
                      'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
                      'sbb-calendar__selected': selected,
                    })}
                    @click=${() => this._onYearSelection(year, shiftRight)}
                    ?disabled=${isOutOfRange || isFilteredOut}
                    aria-label=${year}
                    aria-pressed=${selected}
                    aria-disabled=${String(isOutOfRange || isFilteredOut)}
                    tabindex="-1"
                    data-year=${year || nothing}
                    @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
                  >
                    ${year}
                  </button>
                </td>`;
              })}
            </tr>`,
        )}
      </tbody>
    </table>`;
  }

  /** Select the year and change the view to month selection. */
  private _onYearSelection(year: number, rightSide: boolean): void {
    this._chosenYear = rightSide ? year - 1 : year;
    this._nextCalendarView = 'month';
    this._assignActiveDate(
      this._dateAdapter.createDate(
        this._chosenYear,
        this._dateAdapter.getMonth(this._activeDate),
        this._dateAdapter.getDate(this._activeDate),
      ),
    );
    this._startTableTransition();
  }

  private _getView(): TemplateResult {
    if (isServer || this.hydrationRequired) {
      // TODO: We disable SSR for calendar for now. Figure out, if there is a way
      // to enable it, while considering i18n and date information.
      return html`${nothing}`;
    }
    switch (this._calendarView) {
      case 'year':
        return this._renderYearView();
      case 'month':
        return this._renderMonthView();
      case 'day':
      default:
        return this._renderDayView();
    }
  }

  private _tableAnimationEnd(event: AnimationEvent): void {
    const table = event.target as HTMLElement;
    if (event.animationName === 'hide') {
      table.classList.remove('sbb-calendar__table-hide');
      if (this._containingFocus) {
        this._resetFocus = true;
      }
      this._calendarView = this._nextCalendarView;
    } else if (event.animationName === 'show') {
      this.internals.states.delete('transition');
    }
  }

  private _startTableTransition(): void {
    this.internals.states.add('transition');
    this.shadowRoot
      ?.querySelectorAll('table')
      ?.forEach((e) => e.classList.toggle('sbb-calendar__table-hide'));
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-calendar__wrapper">${this._getView()}</div>`;
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
