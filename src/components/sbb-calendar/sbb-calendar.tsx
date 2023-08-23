import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { i18nNextMonth, i18nPreviousMonth } from '../../global/i18n';
import { Day, Month, Weekday } from './sbb-calendar.custom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import {
  DateAdapter,
  DAYS_PER_WEEK,
  MONTHS_PER_ROW,
  NativeDateAdapter,
  YEARS_PER_PAGE,
  YEARS_PER_ROW,
} from '../../global/datetime';
import { isBreakpoint, toggleDatasetEntry} from '../../global/dom';
import { isArrowKeyOrPageKeysPressed } from '../../global/a11y';
import { resolveButtonRenderVariables } from '../../global/interfaces';

@Component({
  shadow: true,
  styleUrl: 'sbb-calendar.scss',
  tag: 'sbb-calendar',
})
export class SbbCalendar implements ComponentInterface {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. Takes Date Object, ISOString, and Unix Timestamp (number of seconds since Jan 1, 1970). */
  @Prop() public min: Date | string | number;

  /** The maximum valid date. Takes Date Object, ISOString, and Unix Timestamp (number of seconds since Jan 1, 1970). */
  @Prop() public max: Date | string | number;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** The selected date. Takes Date Object, ISOString, and Unix Timestamp (number of seconds since Jan 1, 1970). */
  @Prop() public selectedDate: Date | string | number;

  /** Event emitted on date selection. */
  @Event({ eventName: 'date-selected' }) public dateSelected: EventEmitter<Date>;

  /** The currently active date. */
  @State() private _activeDate: Date;

  /** The selected date as ISOString. */
  @State() private _selected: string;

  /** The current wide property considering property value and breakpoints. From zero to small `wide` has always to be false. */
  @State() private _wide: boolean;

  /** Minimum value converted to date */
  @State() private _min: Date;

  /** Maximum value converted to date */
  @State() private _max: Date;

  @State() private _selection: 'day' | 'month' | 'year' = 'day';

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _dateAdapter: DateAdapter<Date> = new NativeDateAdapter();

  /** A list of days, in two formats (long and single char). */
  private _weekdays: Weekday[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day[][];

  /** Grid of calendar cells representing months. */
  private _months: Month[][];

  /** Grid of calendar cells representing years. */
  private _years: number[][]; // TODO type if needed

  /** Grid of calendar cells representing years for the wide view. */
  private _nextMonthYears: number[][]; // TODO type if needed

  /** Grid of calendar cells representing the dates of the next month. */
  private _nextMonthWeeks: Day[][];

  /** An array containing all the month names in the current language. */
  private _monthNames = this._dateAdapter.getMonthNames('long');

  /** A list of buttons corresponding to the days of the month. */
  private get _days(): HTMLButtonElement[] {
    return Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-calendar__day'),
    ) as HTMLButtonElement[];
  }

  private _calendarController: AbortController;
  private _chosenYear: number; // TODO docs
  private _chosenMonth: number; // TODO docs

  private _handlerRepository = new HandlerRepository(
    this._element as HTMLElement,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      this._monthNames = this._dateAdapter.getMonthNames('long');
    }),
  );

  @Watch('min')
  private _convertMinDate(newMin: Date | string | number): void {
    this._min = this._dateAdapter.deserializeDate(newMin);
  }

  @Watch('max')
  private _convertMaxDate(newMax: Date | string | number): void {
    this._max = this._dateAdapter.deserializeDate(newMax);
  }

  /** Sets the selected date. */
  @Watch('selectedDate')
  private _setSelectedDate(selectedDate: Date | null): void {
    if (
      !!selectedDate &&
      (!this._isDayInRange(this._dateAdapter.getISOString(selectedDate)) ||
        this.dateFilter(selectedDate))
    ) {
      this._selected = this._dateAdapter.getISOString(selectedDate);
    } else {
      this._selected = undefined;
    }
  }

  /** Resets the active month according to the new state of the calendar. */
  @Method()
  @Watch('wide')
  public async resetPosition(): Promise<void> {
    this._setDates();
    this._init();
  }

  public connectedCallback(): void {
    this._element.focus = this._focusCell.bind(this);
    this._handlerRepository.connect();
    this._calendarController = new AbortController();
    window.addEventListener('resize', () => this._init(), {
      passive: true,
      signal: this._calendarController.signal,
    });
    this._convertMinDate(this.min);
    this._convertMaxDate(this.max);
    this._setDates();
    this._init();
  }

  public componentDidRender(): void {
    // The calendar needs to calculate tab-indexes on first render,
    // and every time a date is selected or the month view changes.
    this._setTabIndex();
  }

  public disconnectedCallback(): void {
    this._calendarController.abort();
    this._handlerRepository.disconnect();
  }

  /** Initializes the component. */
  private _init(): void {
    this._wide = isBreakpoint('medium') && this.wide;
    toggleDatasetEntry(this._element, 'wide', this._wide);
    this._setWeekdays();
    this._weeks = this._createWeekRows(
      this._dateAdapter.getMonth(this._activeDate),
      this._dateAdapter.getYear(this._activeDate),
    );
    this._nextMonthWeeks = [[]];
    this._months = this._createMonthRows();
    this._nextMonthYears = [[]];
    this._years = this._createYearRows();
    if (this._wide) {
      const nextMonthDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
      this._nextMonthWeeks = this._createWeekRows(
        this._dateAdapter.getMonth(nextMonthDate),
        this._dateAdapter.getYear(nextMonthDate),
      );
      this._nextMonthYears = this._createYearRows(YEARS_PER_PAGE);
    }
  }

  /** Focuses on a day cell prioritizing the selected day, the current day, and lastly, the first selectable day. */
  private _focusCell(): void {
    this._getFirstFocusable()?.focus();
  }

  /** Sets the date variables. */
  private _setDates(): void {
    const selectedDate: Date = this._dateAdapter.deserializeDate(this.selectedDate);
    this._activeDate = selectedDate ?? this._now();
    this._setSelectedDate(selectedDate);
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

  /** Creates the rows for each week. */
  private _createWeekRows(month: number, year: number): Day[][] {
    const daysInMonth: number = this._dateAdapter.getNumDaysInMonth(year, month);
    const dateNames: string[] = this._dateAdapter.getDateNames();
    const weeks: Day[][] = [[]];
    const weekOffset = this._dateAdapter.getFirstWeekOffset(year, month);
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_WEEK) {
        weeks.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(year, month, i + 1);
      weeks[weeks.length - 1].push({
        value: this._dateAdapter.getISOString(date),
        dayValue: dateNames[i],
        monthValue: String(month + 1),
        yearValue: String(year),
      });
    }
    return weeks;
  }

  /** Creates the rows for the month selection view. */
  private _createMonthRows(): Month[][] {
    const months: Month[] = this._dateAdapter
      .getMonthNames('short')
      .map((e: string, i: number) => ({ value: e, monthValue: i }));
    const rows: number = 12 / MONTHS_PER_ROW;
    const monthArray: Month[][] = [];
    for (let i: number = 0; i < rows; i++) {
      monthArray.push(months.slice(MONTHS_PER_ROW * i, MONTHS_PER_ROW * (i + 1)));
    }
    return monthArray;
  }

  /** Creates the rows for the year selection view. */
  private _createYearRows(offset: number = 0): number[][] {
    const minYearOfPage =
      this._dateAdapter.getYear(this._activeDate) -
      this._dateAdapter.getActiveYearOffset(this._activeDate, this._min, this._max);
    const allYears: number[] = new Array(YEARS_PER_PAGE)
      .fill(0)
      .map((_, i) => minYearOfPage + offset + i);
    const rows: number = YEARS_PER_PAGE / YEARS_PER_ROW;
    const yearArray: number[][] = [];
    for (let i: number = 0; i < rows; i++) {
      yearArray.push(allYears.slice(YEARS_PER_ROW * i, YEARS_PER_ROW * (i + 1)));
    }
    return yearArray;
  }

  /** Checks if date is within the min-max range. */
  private _isDayInRange(date: string): boolean {
    if (!this._min && !this._max) {
      return true;
    }
    const isBeforeMin =
      this._dateAdapter.isValid(this._min) &&
      this._dateAdapter.compareDate(this._min, this._dateAdapter.createDateFromISOString(date)) > 0;
    const isAfterMax =
      this._dateAdapter.isValid(this._max) &&
      this._dateAdapter.compareDate(this._max, this._dateAdapter.createDateFromISOString(date)) < 0;
    return !(isBeforeMin || isAfterMax);
  }

  private _isMonthInRange(month: number): boolean {
    if (!this._min && !this._max) {
      return true;
    }
    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this._min) &&
      this._dateAdapter.getYear(this._min) >= this._chosenYear &&
      this._dateAdapter.getMonth(this._min) > month;
    const isAfterMax: boolean =
      this._dateAdapter.isValid(this._max) &&
      this._dateAdapter.getYear(this._max) <= this._chosenYear &&
      this._dateAdapter.getMonth(this._max) < month;
    return !(isBeforeMin || isAfterMax);
  }

  private _isYearInRange(year: number): boolean {
    if (!this._min && !this._max) {
      return true;
    }
    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this._min) && this._dateAdapter.getYear(this._min) > year;
    const isAfterMax: boolean =
      this._dateAdapter.isValid(this._max) && this._dateAdapter.getYear(this._max) < year;
    return !(isBeforeMin || isAfterMax);
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/year-view.ts#L366
  private _isMonthFilteredOut(month: number): boolean {
    if (!this.dateFilter) {
      return true;
    }

    const firstOfMonth = this._dateAdapter.createDate(this._chosenYear, month, 1);
    for (
      let date = firstOfMonth;
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

    const firstOfYear = this._dateAdapter.createDate(year, 0, 1);
    for (
      let date = firstOfYear;
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
  private _selectDate(day: string): void {
    if (this._selected !== day) {
      this._selected = day;
      this.dateSelected.emit(this._dateAdapter.createDateFromISOString(day));
    }
  }

  private _assignActiveDate(date: Date): void {
    if (this._min && this._dateAdapter.compareDate(this._min, date) > 0) {
      this._activeDate = this._min;
      return;
    }
    if (this._max && this._dateAdapter.compareDate(this._max, date) < 0) {
      this._activeDate = this._max;
      return;
    }
    this._activeDate = date;
  }

  /** Goes to the month identified by the shift. */
  private _goToDifferentMonth(months: number): void {
    this._assignActiveDate(this._dateAdapter.addCalendarMonths(this._activeDate, months));
    this._init();
  }

  private _goToDifferentYear(years: number): void {
    this._chosenYear += years;
    const newDateWithChosenYear: Date = new Date(
      this._chosenYear,
      this._dateAdapter.getMonth(this._activeDate),
      this._dateAdapter.getDate(this._activeDate),
    );
    this._assignActiveDate(this._dateAdapter.addCalendarYears(newDateWithChosenYear, years));
    this._init();
  }

  private _goToDifferentYearRange(years: number): void {
    this._assignActiveDate(this._dateAdapter.addCalendarYears(this._activeDate, years));
    this._init();
  }

  /** Checks if the "previous month" button should be disabled. */
  private _previousMonthDisabled(): boolean {
    if (!this._min) {
      return false;
    }
    const prevMonth = this._dateAdapter.clone(this._activeDate);
    prevMonth.setDate(0);
    return this._dateAdapter.compareDate(prevMonth, this._min) < 0;
  }

  /** Checks if the "next month" button should be disabled. */
  private _nextMonthDisabled(): boolean {
    if (!this._max) {
      return false;
    }
    const nextMonth = this._dateAdapter.addCalendarMonths(this._activeDate, this._wide ? 2 : 1);
    nextMonth.setDate(1);
    return this._dateAdapter.compareDate(nextMonth, this._max) > 0;
  }

  private _handleTableBlur(eventTarget: HTMLElement): void {
    if (eventTarget?.tagName !== 'BUTTON') {
      this._setTabIndex();
    }
  }

  private _setTabIndex(): void {
    Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-calendar__day[tabindex="0"]'),
    ).forEach((day) => ((day as HTMLElement).tabIndex = -1));
    const firstFocusable = this._getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  private _getFirstFocusable(): HTMLButtonElement {
    let firstFocusable =
      this._element.shadowRoot.querySelector('.sbb-calendar__day-selected') ??
      this._element.shadowRoot.querySelector('.sbb-calendar__day-today');
    if (!firstFocusable || (firstFocusable as HTMLButtonElement)?.disabled) {
      firstFocusable = this._element.shadowRoot.querySelector('.sbb-calendar__day:not([disabled])');
    }
    return (firstFocusable as HTMLButtonElement) || null;
  }

  private _handleKeyboardEvent(event, day: Day): void {
    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
    }
    const days = this._days;
    const index = days.findIndex((e: HTMLButtonElement) => e === event.target);
    const nextEl = this._navigateByKeyboard(event, index, days, day);
    const activeEl = this._element.shadowRoot.activeElement;
    if (nextEl !== activeEl) {
      (nextEl as HTMLButtonElement).tabIndex = 0;
      nextEl?.focus();
      (activeEl as HTMLButtonElement).tabIndex = -1;
    }
  }

  /**
   * Gets the index of the element to move to, based on a list of elements, which can be potentially disabled,
   * the keyboard input and the position of the current element in the list.
   */
  private _navigateByKeyboard(
    evt: KeyboardEvent,
    index: number,
    days: HTMLButtonElement[],
    day: Day,
  ): HTMLButtonElement {
    // Calculate the index of the starting day in the month.
    const indexInMonth = +day.dayValue - 1;

    // Calculates the day's offset from the first month
    // (in single view, it's zero, in wide view it's the number of the first month's days).
    const firstMonthOffset = index - indexInMonth;

    // Calculates the index of the last day in the starting month.
    // When one month is displayed, it is exactly the length of the `days` array, and the same when two months are displayed,
    // but the starting position is in the second one; if the starting position is in the first one, it calculates
    // the last day using the year and month value and setting the day to zero.
    const indexOfLastDayOfCurrentMonth =
      index === indexInMonth
        ? this._dateAdapter.getNumDaysInMonth(+day.yearValue, +day.monthValue - 1)
        : days.length;

    switch (evt.key) {
      case 'ArrowUp':
        return this._findNext(days, index, -7);
      case 'ArrowDown':
        return this._findNext(days, index, 7);
      case 'ArrowLeft':
        return this._findNext(days, index, -1);
      case 'ArrowRight':
        return this._findNext(days, index, 1);
      case 'Home':
        return this._findFirst(days, firstMonthOffset);
      case 'PageUp':
        return this._findFirstOnColumn(days, indexInMonth, firstMonthOffset);
      case 'PageDown':
        return this._findLastOnColumn(days, index, indexOfLastDayOfCurrentMonth);
      case 'End':
        return this._findLast(days, indexOfLastDayOfCurrentMonth - 1);
      default:
        return days[index];
    }
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
  ): HTMLButtonElement {
    const nextIndex = (index % 7) + offset;
    return !days[nextIndex].disabled ? days[nextIndex] : this._findNext(days, nextIndex, 7);
  }

  /** Find the last enabled element in the same column of the provided array. */
  private _findLastOnColumn(
    days: HTMLButtonElement[],
    index: number,
    offset: number,
  ): HTMLButtonElement {
    const nextIndex = index + Math.trunc((offset - index - 1) / 7) * 7;
    return !days[nextIndex].disabled ? days[nextIndex] : this._findNext(days, nextIndex, -7);
  }

  private _now(): Date {
    if (this._hasDataNow()) {
      const today = new Date(+this._element.dataset?.now);
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return this._dateAdapter.today();
  }

  private _hasDataNow(): boolean {
    const dataNow = +this._element.dataset?.now;
    return !isNaN(dataNow);
  }

  /** Render the view for the day selection. */
  private _renderDayView(): JSX.Element {
    const nextMonthActiveDate = this._wide
      ? this._dateAdapter.addCalendarMonths(this._activeDate, 1)
      : undefined;
    return (
      <Fragment>
        <div class="sbb-calendar__controls">
          <sbb-button
            variant="secondary"
            iconName="chevron-small-left-small"
            size="m"
            aria-label={i18nPreviousMonth[this._currentLanguage]}
            onClick={() => this._goToDifferentMonth(-1)}
            disabled={this._previousMonthDisabled()}
            id="sbb-calendar__controls-previous"
          ></sbb-button>
          <div class="sbb-calendar__controls-month">
            {this._createLabelForDayView(this._activeDate)}
            {this._wide && this._createLabelForDayView(nextMonthActiveDate)}
            <span role="status" class="sbb-calendar__visually-hidden">
              {this._createAriaLabelForDayView(this._activeDate, nextMonthActiveDate)}
            </span>
          </div>
          <sbb-button
            variant="secondary"
            iconName="chevron-small-right-small"
            size="m"
            aria-label={i18nNextMonth[this._currentLanguage]}
            onClick={() => this._goToDifferentMonth(1)}
            disabled={this._nextMonthDisabled()}
            id="sbb-calendar__controls-next"
          ></sbb-button>
        </div>
        <div class="sbb-calendar__table-container">
          {this._createDayTable(this._weeks)}
          {this._wide && this._createDayTable(this._nextMonthWeeks)}
        </div>
      </Fragment>
    );
  }

  /** Creates the label with the month for the daily view. */
  private _createLabelForDayView(d: Date): JSX.Element {
    const monthLabel = `${
      this._monthNames[this._dateAdapter.getMonth(d)]
    } ${this._dateAdapter.getYear(d)}`;

    return (
      <span
        {...resolveButtonRenderVariables({})}
        class="sbb-calendar__controls-month-label"
        aria-hidden="true"
        onClick={() => (this._selection = 'year')}
      >
        {monthLabel}
        <sbb-icon name="chevron-small-down-small"></sbb-icon>
      </span>
    );
  }

  /** Creates the aria-label with the month for the daily view. */
  private _createAriaLabelForDayView(...dates: Date[]): string {
    let monthLabel = '';
    for (const d of dates) {
      if (d) {
        monthLabel += `${
          this._monthNames[this._dateAdapter.getMonth(d)]
        } ${this._dateAdapter.getYear(d)} `;
      }
    }
    return monthLabel;
  }

  /** Creates the calendar table for the daily view. */
  private _createDayTable(weeks: Day[][]): JSX.Element {
    return (
      <table
        class="sbb-calendar__table"
        onFocusout={(event) => this._handleTableBlur(event.relatedTarget as HTMLElement)}
      >
        <thead class="sbb-calendar__table-header">
          <tr class="sbb-calendar__table-header-row">{this._createDayTableHeader()}</tr>
        </thead>
        <tbody class="sbb-calendar__table-body">{this._createDayTableBody(weeks)}</tbody>
      </table>
    );
  }

  /** Creates the table header with the month header cells. */
  private _createDayTableHeader(): JSX.Element {
    return this._weekdays.map((day: Weekday) => (
      <th class="sbb-calendar__table-header">
        <span class="sbb-calendar__visually-hidden">{day.long}</span>
        <span aria-hidden="true">{day.narrow}</span>
      </th>
    ));
  }

  /** Creates the table body with the day cells. For the first row, it also considers the possible day's offset. */
  private _createDayTableBody(weeks: Day[][]): JSX.Element {
    const today: string = this._dateAdapter.getISOString(this._now());
    return weeks.map((week: Day[], rowIndex: number) => {
      const firstRowOffset: number = DAYS_PER_WEEK - week.length;
      if (rowIndex === 0 && firstRowOffset) {
        return (
          <tr>
            {[...Array(firstRowOffset).keys()].map(() => (
              <td
                class="sbb-calendar__table-data-empty"
                data-day={`0 ${week[0].monthValue} ${week[0].yearValue}`}
              ></td>
            ))}
            {this._createDayCells(week, today)}
          </tr>
        );
      }
      return <tr>{this._createDayCells(week, today)}</tr>;
    });
  }

  /** Creates the cells for the daily view. */
  private _createDayCells(week: Day[], today: string): JSX.Element {
    return week.map((day: Day) => {
      const isOutOfRange = !this._isDayInRange(day.value);
      const isFilteredOut = !this.dateFilter(this._dateAdapter.createDateFromISOString(day.value));
      const selected: boolean = this._selected && day.value === this._selected;
      const dayValue = `${day.dayValue} ${day.monthValue} ${day.yearValue}`;
      const isToday = day.value === today;
      return (
        <td
          class={{
            'sbb-calendar__table-data': true,
            'sbb-calendar__table-data-selected': selected,
          }}
        >
          <button
            class={{
              'sbb-calendar__day': true,
              'sbb-calendar__day-today': isToday,
              'sbb-calendar__day-selected': selected,
              'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
            }}
            onClick={() => this._selectDate(day.value)}
            disabled={isOutOfRange || isFilteredOut}
            aria-label={this._dateAdapter.getAccessibilityFormatDate(day.value)}
            aria-pressed={String(selected)}
            aria-disabled={String(isOutOfRange || isFilteredOut)}
            aria-current={isToday ? 'date' : undefined}
            data-day={dayValue}
            tabindex="-1"
            onKeyDown={(evt: KeyboardEvent) => this._handleKeyboardEvent(evt, day)}
            sbb-tooltip-close
          >
            {day.dayValue}
          </button>
        </td>
      );
    });
  }

  /** Render the view for the month selection. */
  private _renderMonthView(): JSX.Element {
    return (
      <Fragment>
        <div class="sbb-calendar__controls">
          {/* FIXME aria-label disabled id? */}
          <sbb-button
            variant="secondary"
            iconName="chevron-small-left-small"
            size="m"
            aria-label={i18nPreviousMonth[this._currentLanguage]}
            onClick={() => this._goToDifferentYear(-1)}
            disabled={this._previousMonthDisabled()}
            id="sbb-calendar__controls-previous"
          ></sbb-button>
          <div class="sbb-calendar__controls-month">
            {this._createLabelForMonthView()}
            <span role="status" class="sbb-calendar__visually-hidden">
              {this._createAriaLabelForMonthView()}
            </span>
          </div>
          {/* FIXME aria-label disabled id? */}
          <sbb-button
            variant="secondary"
            iconName="chevron-small-right-small"
            size="m"
            aria-label={i18nNextMonth[this._currentLanguage]}
            onClick={() => this._goToDifferentYear(1)}
            disabled={this._nextMonthDisabled()}
            id="sbb-calendar__controls-next"
          ></sbb-button>
        </div>
        <div class="sbb-calendar__table-container">{this._createMonthTable(this._months)}</div>
      </Fragment>
    );
  }

  /** Creates the label with the year for the monthly view. */
  private _createLabelForMonthView(): JSX.Element {
    return (
      <span
        {...resolveButtonRenderVariables({})}
        class="sbb-calendar__controls-month-label"
        aria-hidden="true"
        onClick={() => (this._selection = 'day')}
      >
        {this._chosenYear}
        <sbb-icon name="chevron-small-up-small"></sbb-icon>
      </span>
    );
  }

  // FIXME
  /** Creates the aria-label with the year for the monthly view. */
  private _createAriaLabelForMonthView(): string {
    return 'FIXME';
  }

  // FIXME selected aria-label aria-pressed data-<>? tabindex keydown tooltip-close
  /** Creates the table for the month selection view. */
  private _createMonthTable(months: Month[][]): JSX.Element {
    return (
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header" aria-hidden={true}>
          <tr class="sbb-calendar__table-header-row">
            <th colSpan={MONTHS_PER_ROW}></th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          {months.map((row: Month[]) => (
            <tr>
              {row.map((month: Month) => {
                const isOutOfRange = !this._isMonthInRange(month.monthValue);
                const isFilteredOut = !this._isMonthFilteredOut(month.monthValue);
                return (
                  <td class="sbb-calendar__table-data">
                    <button
                      class={{
                        'sbb-calendar__day': true,
                        'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
                      }}
                      onClick={() => this._onMonthSelection(month.monthValue)}
                      disabled={isOutOfRange || isFilteredOut}
                      aria-disabled={String(isOutOfRange || isFilteredOut)}
                    >
                      {month.value}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // FIXME
  private _onMonthSelection(month: number): void {
    this._chosenMonth = month;
    this._assignActiveDate(
      new Date(this._chosenYear, this._chosenMonth, this._activeDate.getDate()),
    );
    this._init();
    this._selection = 'day';
    this._chosenMonth = undefined;
    this._chosenYear = undefined;
  }

  /** Render the view for the year selection. */
  private _renderYearView(): JSX.Element {
    return (
      <Fragment>
        <div class="sbb-calendar__controls">
          {/* FIXME aria-label disabled id? */}
          <sbb-button
            variant="secondary"
            iconName="chevron-small-left-small"
            size="m"
            aria-label={i18nPreviousMonth[this._currentLanguage]}
            onClick={() => this._goToDifferentYearRange(-YEARS_PER_PAGE)}
            disabled={this._previousMonthDisabled()}
            id="sbb-calendar__controls-previous"
          ></sbb-button>
          <div class="sbb-calendar__controls-month">
            {this._createLabelForYearView()}
            <span role="status" class="sbb-calendar__visually-hidden">
              {this._createAriaLabelForYearView()}
            </span>
          </div>
          {/* FIXME aria-label disabled id? */}
          <sbb-button
            variant="secondary"
            iconName="chevron-small-right-small"
            size="m"
            aria-label={i18nNextMonth[this._currentLanguage]}
            onClick={() => this._goToDifferentYearRange(YEARS_PER_PAGE)}
            disabled={this._nextMonthDisabled()}
            id="sbb-calendar__controls-next"
          ></sbb-button>
        </div>
        <div class="sbb-calendar__table-container">
          {this._createYearTable(this._years)}
          {this._wide && this._createYearTable(this._nextMonthYears)}
        </div>
      </Fragment>
    );
  }

  /** Creates the label with the year range for the yearly view. */
  private _createLabelForYearView(): JSX.Element {
    const firstYear: number = this._years[0][0];
    const lastYearArray: number[][] = this.wide ? this._nextMonthYears : this._years;
    const lastYear: number = lastYearArray[lastYearArray.length - 1][lastYearArray[0].length - 1];
    const yearLabel = `${firstYear} - ${lastYear}`;

    return (
      <span
        {...resolveButtonRenderVariables({})}
        class="sbb-calendar__controls-month-label"
        aria-hidden="true"
        onClick={() => (this._selection = 'day')}
      >
        {yearLabel}
        <sbb-icon name="chevron-small-up-small"></sbb-icon>
      </span>
    );
  }

  // FIXME
  /** Creates the aria-label with the year range for the yearly view. */
  private _createAriaLabelForYearView(): string {
    return 'FIXME';
  }

  /** Creates the table for the year selection view. */
  private _createYearTable(years: number[][]): JSX.Element {
    return (
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header" aria-hidden={true}>
          <tr class="sbb-calendar__table-header-row">
            <th colSpan={YEARS_PER_ROW}></th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">{this._createYearTableBody(years)}</tbody>
      </table>
    );
  }

  // FIXME selected aria-label aria-pressed data-<>? tabindex keydown tooltip-close
  /** Creates the table cells for the year selection view. */
  private _createYearTableBody(years: number[][]): JSX.Element {
    return years.map((row: number[]) => (
      <tr>
        {row.map((year: number) => {
          const isOutOfRange = !this._isYearInRange(year);
          const isFilteredOut = !this._isYearFilteredOut(year);
          return (
            <td class="sbb-calendar__table-data">
              <button
                class={{
                  'sbb-calendar__day': true,
                  'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
                }}
                onClick={() => this._onYearSelection(year)}
                disabled={isOutOfRange || isFilteredOut}
                aria-disabled={String(isOutOfRange || isFilteredOut)}
              >
                {year}
              </button>
            </td>
          );
        })}
      </tr>
    ));
  }

  private _onYearSelection(year: number): void {
    this._chosenYear = year;
    this._selection = 'month';
  }

  public render(): JSX.Element {
    switch (this._selection) {
      case 'year':
        return this._renderYearView();
      case 'month':
        return this._renderMonthView();
      case 'day':
      default:
        return this._renderDayView();
    }
  }
}
