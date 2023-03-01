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
import { Day, handleKeyboardEvent, Weekday } from './sbb-calendar.helper';
import { i18nNextMonth, i18nPreviousMonth } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';

@Component({
  shadow: true,
  styleUrl: 'sbb-calendar.scss',
  tag: 'sbb-calendar',
})
export class SbbCalendar implements ComponentInterface {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. */
  @Prop() public min: Date | string | number;

  /** The maximum valid date. */
  @Prop() public max: Date | string | number;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** The selected date. */
  @Prop({ attribute: 'selected-date' }) public selectedDate: Date | string | number;

  /** Event emitted on date selection. */
  @Event({ eventName: 'date-selected' }) public dateSelected: EventEmitter<Date>;

  /** The currently active date. */
  @State() private _activeDate: Date;

  /** The selected date as ISOString. */
  @State() private _selected: string;

  /** The current width */
  @State() private _wide: boolean;

  /** Minimum value converted to date */
  @State() private _min: Date;

  /** Maximum value converted to date */
  @State() private _max: Date;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element: HTMLElement;

  private _dateAdapter: NativeDateAdapter = new NativeDateAdapter();

  /** A list of buttons corresponding to the days of the month. */
  private _days: HTMLButtonElement[];

  /** A list of the day of the week, in two format (long and single char). */
  private _weekdays: Weekday[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day[][];

  /** Grid of calendar cells representing the dates of the next month. */
  private _nextMonthWeeks: Day[][];

  @Watch('min')
  public convertMinDate(newMin: Date | string | number): void {
    this._min = this._dateAdapter.deserializeDate(newMin);
  }

  @Watch('max')
  public convertMaxDate(newMax: Date | string | number): void {
    this._max = this._dateAdapter.deserializeDate(newMax);
  }

  @Watch('wide')
  public changeWidthConfiguration(newValue: boolean): void {
    this._setCalendarWidth(newValue);
  }

  @Watch('selectedDate')
  public selectedDateChanged(newDate: Date | string | number): void {
    this._setSelectedDate(this._dateAdapter.deserializeDate(newDate));
  }

  /** Focuses on a day cell. */
  @Method()
  public async focusCell(): Promise<void> {
    const toFocus = this._getFirstFocusable();
    toFocus?.focus();
  }

  /** Resets the active month according to the new state of the calendar. */
  @Method()
  public async resetPosition(): Promise<void> {
    this._setDates();
    this._init();
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  public connectedCallback(): void {
    window.addEventListener('resize', () => this._init(), { passive: true });
    this.convertMinDate(this.min);
    this.convertMaxDate(this.max);
    this._setDates();
    this._init();
  }

  public componentDidRender(): void {
    this._setTabIndex();
    this._days = Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-datepicker__day')
    ) as HTMLButtonElement[];
  }

  /** Initializes the component. */
  private _init(): void {
    this._setCalendarWidth(this.wide);
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

  /** Sets the date variables. */
  private _setDates(): void {
    const selectedDate: Date = this._dateAdapter.deserializeDate(this.selectedDate);
    this._activeDate = selectedDate ?? this._dateAdapter.today();
    this._setSelectedDate(selectedDate);
  }

  /** Sets the selected date. */
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

  private _setCalendarWidth(value: boolean): void {
    this._wide = isBreakpoint('medium') && value;
  }

  /** Creates the array of weekdays. */
  private _setWeekdays(): void {
    const narrowWeekdays: string[] = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays: string[] = this._dateAdapter.getDayOfWeekNames('long');
    const weekdays: Weekday[] = longWeekdays.map((long, i) => ({
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
      <table class="sbb-calendar__table">
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
      <th>
        <span class="visually-hidden">{day.long}</span>
        <span aria-hidden="true">{day.narrow}</span>
      </th>
    ));
  }

  /**
   * Creates the table body with the days cells. For the first row, it also considers the possible day's offset.
   */
  private _createTableBody(weeks: Day[][]): JSX.Element {
    return weeks.map((week: Day[], rowIndex: number) => {
      const firstRowOffset: number = NativeDateAdapter.DAYS_PER_WEEK - week.length;
      if (rowIndex === 0 && firstRowOffset) {
        return (
          <tr>
            <td
              colSpan={firstRowOffset}
              data-day={`0 ${week[0].monthValue} ${week[0].yearValue}`}
            ></td>
            {this._createDayCells(week)}
          </tr>
        );
      }
      return <tr>{this._createDayCells(week)}</tr>;
    });
  }

  /** Creates the cells for the days. */
  private _createDayCells(week: Day[]): JSX.Element {
    const today: string = this._dateAdapter.today().toISOString();
    return week.map((day: Day) => {
      const isOutOfRange = !this._isDayInRange(day.value);
      const isFilteredOut = !this.dateFilter(new Date(day.value));
      const selected: boolean = this._selected && day.value === this._selected;
      const label = `${day.dayValue} ${day.monthValue} ${day.yearValue}`;
      return (
        <td>
          <button
            class={{
              'sbb-datepicker__day': true,
              'sbb-datepicker__day-today': day.value === today,
              'sbb-datepicker__day-selected': selected,
              'sbb-datepicker__crossed-out': !isOutOfRange && isFilteredOut,
            }}
            onClick={(event) => this._selectDate(day.value, event)}
            disabled={isOutOfRange || isFilteredOut}
            aria-label={label}
            aria-pressed={selected ? 'true' : 'false'}
            aria-disabled={String(isOutOfRange || isFilteredOut)}
            data-day={label}
            tabindex="-1"
            onKeyDown={(evt: KeyboardEvent) => handleKeyboardEvent(evt, this._days)}
          >
            {day.dayValue}
          </button>
        </td>
      );
    });
  }

  /** Creates the month label. */
  private _createMonthLabel(d: Date): JSXElement {
    return (
      <span class="sbb-calendar__controls-month-label">
        {this._dateAdapter.getMonthNames('long')[this._dateAdapter.getMonth(d)]}{' '}
        {this._dateAdapter.getYear(d)}
      </span>
    );
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

  /** Goes to the next month. */
  private _nextMonthClicked(event: Event): void {
    event.stopImmediatePropagation();
    this._assignActiveDate(this._dateAdapter.addCalendarMonths(this._activeDate, 1));
    this._init();
  }

  /** Goes to the previous month. */
  private _previousMonthClicked(event: Event): void {
    event.stopImmediatePropagation();
    this._assignActiveDate(this._dateAdapter.addCalendarMonths(this._activeDate, -1));
    this._init();
  }

  /** Checks if the "previous month" button is enabled. */
  private _previousMonthEnabled(): boolean {
    if (!this._min) {
      return false;
    }
    const prevMonth = this._dateAdapter.clone(this._activeDate);
    prevMonth.setDate(0);
    return this._dateAdapter.compareDate(prevMonth, this._min) < 0;
  }

  /** Checks if the "next month" button is enabled. */
  private _nextMonthEnabled(): boolean {
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
      this._element.shadowRoot.querySelector('.sbb-datepicker__day-selected') ??
      this._element.shadowRoot.querySelector('.sbb-datepicker__day-today');
    if (!firstFocusable || (firstFocusable as HTMLButtonElement)?.disabled) {
      firstFocusable = Array.from(
        this._element.shadowRoot.querySelectorAll('.sbb-datepicker__day')
      ).find((e) => !(e as HTMLButtonElement).disabled);
    }
    return (firstFocusable as HTMLButtonElement) || null;
  }

  private _setTabIndex(): void {
    Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-datepicker__day[tabindex="0"]')
    ).forEach((day) => ((day as HTMLElement).tabIndex = -1));
    const firstFocusable = this._getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-calendar__wrapper">
        <div class="sbb-calendar__controls">
          <sbb-button
            variant="secondary"
            iconName="chevron-small-left-small"
            size="m"
            accessibility-label={i18nPreviousMonth[this._currentLanguage]}
            onClick={(event) => this._previousMonthClicked(event)}
            disabled={this._previousMonthEnabled()}
            id="sbb-calendar__controls-previous"
          ></sbb-button>
          <div class="sbb-calendar__controls-month">
            {this._createMonthLabel(this._activeDate)}
            {this._wide &&
              this._createMonthLabel(this._dateAdapter.addCalendarMonths(this._activeDate, 1))}
          </div>
          <sbb-button
            variant="secondary"
            iconName="chevron-small-right-small"
            size="m"
            accessibility-label={i18nNextMonth[this._currentLanguage]}
            onClick={(event) => this._nextMonthClicked(event)}
            disabled={this._nextMonthEnabled()}
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
