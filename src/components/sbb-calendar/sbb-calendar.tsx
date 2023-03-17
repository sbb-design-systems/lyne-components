import { JSXElement } from '@babel/types';
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { isBreakpoint } from '../../global/helpers/breakpoint';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { Day, Weekday } from './sbb-calendar.custom';
import { i18nNextMonth, i18nPreviousMonth } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { isArrowKeyOrPageKeysPressed } from '../../global/helpers/arrow-navigation';

@Component({
  shadow: true,
  styleUrl: 'sbb-calendar.scss',
  tag: 'sbb-calendar',
})
export class SbbCalendar implements ComponentInterface {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. Takes Date Object, ISOString, and Unix Timestamp (number of seconds since Jan 1 1970). */
  @Prop() public min: Date | string | number;

  /** The maximum valid date. Takes Date Object, ISOString, and Unix Timestamp (number of seconds since Jan 1 1970). */
  @Prop() public max: Date | string | number;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** The selected date. Takes Date Object, ISOString, and Unix Timestamp (number of seconds since Jan 1 1970). */
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

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element: HTMLElement;

  private _dateAdapter: NativeDateAdapter = new NativeDateAdapter();

  /** A list of the day of the week, in two format (long and single char). */
  private _weekdays: Weekday[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day[][];

  /** Grid of calendar cells representing the dates of the next month. */
  private _nextMonthWeeks: Day[][];

  /** An array containing all the month names in the current language. */
  private _months = this._dateAdapter.getMonthNames('long');

  /** A list of buttons corresponding to the days of the month. */
  private get _days(): HTMLButtonElement[] {
    return Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-calendar__day')
    ) as HTMLButtonElement[];
  }

  private _calendarController: AbortController;

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
      (!this._isDayInRange(selectedDate.toISOString()) || this.dateFilter(selectedDate))
    ) {
      this._selected = new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString();
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

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
    this._months = this._dateAdapter.getMonthNames('long');
  }

  public connectedCallback(): void {
    this._element.focus = this._focusCell.bind(this);
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
    // The calendar needs to calculate tab-indexes on first render
    // and every time a date is selected or the month view changes.
    this._setTabIndex();
  }

  public disconnectedCallback(): void {
    this._calendarController.abort();
  }

  /** Initializes the component. */
  private _init(): void {
    this._wide = isBreakpoint('medium') && this.wide;
    this._setWeekdays();
    this._weeks = this._createWeekRows(this._activeDate.getMonth(), this._activeDate.getFullYear());
    this._nextMonthWeeks = [[]];
    if (this._wide) {
      const nextMonthDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
      this._nextMonthWeeks = this._createWeekRows(
        nextMonthDate.getMonth(),
        nextMonthDate.getFullYear()
      );
    }
  }

  /** Focuses on a day cell prioritizing the selected day, the current day, and lastly the first selectable day. */
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
      if (cell === NativeDateAdapter.DAYS_PER_WEEK) {
        weeks.push([]);
        cell = 0;
      }
      weeks[weeks.length - 1].push({
        value: new Date(year, month, i + (1 % 12)).toISOString(),
        dayValue: dateNames[i],
        monthValue: String(month + 1),
        yearValue: String(year),
      });
    }
    return weeks;
  }

  /** Creates the calendar table. */
  private _createTable(weeks: Day[][]): JSXElement {
    return (
      <table
        class="sbb-calendar__table"
        onFocusout={(event) => this._handleTableBlur(event.relatedTarget as HTMLElement)}
      >
        <thead class="sbb-calendar__table-header">
          <tr class="sbb-calendar__table-header-row">{this._createTableHeader()}</tr>
        </thead>
        <tbody class="sbb-calendar__table-body">{this._createTableBody(weeks)}</tbody>
      </table>
    );
  }

  /** Creates the table header with the months header cells. */
  private _createTableHeader(): JSX.Element {
    return this._weekdays.map((day: Weekday) => (
      <th class="sbb-calendar__table-header">
        <span class="sbb-calendar__visually-hidden">{day.long}</span>
        <span aria-hidden="true">{day.narrow}</span>
      </th>
    ));
  }

  /**
   * Creates the table body with the days cells. For the first row, it also considers the possible day's offset.
   */
  private _createTableBody(weeks: Day[][]): JSX.Element {
    const today: string = this._now().toISOString();
    return weeks.map((week: Day[], rowIndex: number) => {
      const firstRowOffset: number = NativeDateAdapter.DAYS_PER_WEEK - week.length;
      if (rowIndex === 0 && firstRowOffset) {
        return (
          <tr>
            <td
              colSpan={firstRowOffset}
              data-day={`0 ${week[0].monthValue} ${week[0].yearValue}`}
            ></td>
            {this._createDayCells(week, today)}
          </tr>
        );
      }
      return <tr>{this._createDayCells(week, today)}</tr>;
    });
  }

  /** Creates the cells for the days. */
  private _createDayCells(week: Day[], today: string): JSX.Element {
    return week.map((day: Day) => {
      const isOutOfRange = !this._isDayInRange(day.value);
      const isFilteredOut = !this.dateFilter(new Date(day.value));
      const selected: boolean = this._selected && day.value === this._selected;
      const dayValue = `${day.dayValue} ${day.monthValue} ${day.yearValue}`;
      return (
        <td class="sbb-calendar__table-data">
          <button
            class={{
              'sbb-calendar__day': true,
              'sbb-calendar__day-today': day.value === today,
              'sbb-calendar__day-selected': selected,
              'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
            }}
            onClick={(event) => this._selectDate(day.value, event)}
            disabled={isOutOfRange || isFilteredOut}
            aria-label={this._dateAdapter.getAccessibilityFormatDate(day.value)}
            aria-pressed={String(selected)}
            aria-disabled={String(isOutOfRange || isFilteredOut)}
            data-day={dayValue}
            tabindex="-1"
            onKeyDown={(evt: KeyboardEvent) => this._handleKeyboardEvent(evt, day)}
          >
            {day.dayValue}
          </button>
        </td>
      );
    });
  }

  /** Creates the month label. */
  private _createMonthLabel(d: Date): JSXElement {
    const monthLabel = `${this._months[this._dateAdapter.getMonth(d)]} ${this._dateAdapter.getYear(
      d
    )}`;
    return (
      <span class="sbb-calendar__controls-month-label" aria-hidden="true">
        {monthLabel}
      </span>
    );
  }

  /** Creates the month label. */
  private _createMonthAriaLabel(...dates: Date[]): string {
    let monthLabel = '';
    for (const d of dates) {
      if (d) {
        monthLabel += `${this._months[this._dateAdapter.getMonth(d)]} ${this._dateAdapter.getYear(
          d
        )} `;
      }
    }
    return monthLabel;
  }

  /** Checks if date is within the min-max range. */
  private _isDayInRange(date: string): boolean {
    if (!this._min && !this._max) {
      return true;
    }
    const isBeforeMin =
      this._dateAdapter.isValid(this._min) &&
      this._dateAdapter.compareDate(this._min, new Date(date)) > 0;
    const isAfterMax =
      this._dateAdapter.isValid(this._max) &&
      this._dateAdapter.compareDate(this._max, new Date(date)) < 0;
    return !(isBeforeMin || isAfterMax);
  }

  /** Emits the selected date and sets it internally. */
  private _selectDate(day: string, event: Event): void {
    event.stopImmediatePropagation();
    if (this._selected !== day) {
      this._selected = day;
      this.dateSelected.emit(new Date(day));
    }
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

  /** Goes to the month identified by the shift. */
  private _goToMonth(event: Event, months: number): void {
    event.stopImmediatePropagation();
    this._assignActiveDate(this._dateAdapter.addCalendarMonths(this._activeDate, months));
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

  private _getFirstFocusable(): HTMLButtonElement {
    let firstFocusable =
      this._element.shadowRoot.querySelector('.sbb-calendar__day-selected') ??
      this._element.shadowRoot.querySelector('.sbb-calendar__day-today');
    if (!firstFocusable || (firstFocusable as HTMLButtonElement)?.disabled) {
      firstFocusable = this._element.shadowRoot.querySelector('.sbb-calendar__day:not([disabled]');
    }
    return (firstFocusable as HTMLButtonElement) || null;
  }

  private _setTabIndex(): void {
    Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-calendar__day[tabindex="0"]')
    ).forEach((day) => ((day as HTMLElement).tabIndex = -1));
    const firstFocusable = this._getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  private _handleTableBlur(eventTarget: HTMLElement): void {
    if (eventTarget?.tagName !== 'BUTTON') {
      this._setTabIndex();
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
    offset: number
  ): HTMLButtonElement {
    const nextIndex = (index % 7) + offset;
    return !days[nextIndex].disabled ? days[nextIndex] : this._findNext(days, nextIndex, 7);
  }

  /** Find the last enabled element in the same column of the provided array. */
  private _findLastOnColumn(
    days: HTMLButtonElement[],
    index: number,
    offset: number
  ): HTMLButtonElement {
    const nextIndex = index + Math.trunc((offset - index - 1) / 7) * 7;
    return !days[nextIndex].disabled ? days[nextIndex] : this._findNext(days, nextIndex, -7);
  }

  /**
   * Gets the index of the element to move to, based on a list of elements, which can be potentially disabled,
   * the keyboard input and the position of the current element in the list.
   */
  private _navigateByKeyboard(
    evt: KeyboardEvent,
    index: number,
    days: HTMLButtonElement[],
    day: Day
  ): HTMLButtonElement {
    // Calculate the index of the starting day in the month.
    const indexInMonth = +day.dayValue - 1;

    // Calculates the day's offset from the first month
    // (in single view, it's zero, in wide view it's the number of days of the first month).
    const firstMonthOffset = index - indexInMonth;

    // Calculates the index of the last day in the starting month.
    // When one month is displayed, it is exactly the length of the `days` array, and same when two months are displayed,
    // but the starting position is in the second one; if the starting position is in the first one, it calculates
    // the last day using the year and month value and setting the day to zero.
    const indexOfLastDayOfCurrentMonth =
      index === indexInMonth ? new Date(+day.yearValue, +day.monthValue, 0).getDate() : days.length;

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

  private _hasDataNow(): boolean {
    const dataNow = +this._element.dataset?.now;
    return !isNaN(dataNow);
  }

  private _now(): Date {
    if (this._hasDataNow()) {
      const today = new Date(+this._element.dataset?.now);
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return this._dateAdapter.today();
  }

  public render(): JSX.Element {
    const nextMonthActiveDate = this._wide
      ? this._dateAdapter.addCalendarMonths(this._activeDate, 1)
      : undefined;
    return (
      <div class="sbb-calendar__wrapper">
        <div class="sbb-calendar__controls">
          <sbb-button
            variant="secondary"
            iconName="chevron-small-left-small"
            size="m"
            accessibility-label={i18nPreviousMonth[this._currentLanguage]}
            onClick={(event) => this._goToMonth(event, -1)}
            disabled={this._previousMonthDisabled()}
            id="sbb-calendar__controls-previous"
          ></sbb-button>
          <div class="sbb-calendar__controls-month">
            {this._createMonthLabel(this._activeDate)}
            {this._wide && this._createMonthLabel(nextMonthActiveDate)}
            <span role="status" class="sbb-calendar__visually-hidden">
              {this._createMonthAriaLabel(this._activeDate, nextMonthActiveDate)}
            </span>
          </div>
          <sbb-button
            variant="secondary"
            iconName="chevron-small-right-small"
            size="m"
            accessibility-label={i18nNextMonth[this._currentLanguage]}
            onClick={(event) => this._goToMonth(event, 1)}
            disabled={this._nextMonthDisabled()}
            id="sbb-calendar__controls-next"
          ></sbb-button>
        </div>
        <div class="sbb-calendar__table-container">
          {this._createTable(this._weeks)}
          {this._wide && this._createTable(this._nextMonthWeeks)}
        </div>
      </div>
    );
  }
}
