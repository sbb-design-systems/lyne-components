import { JSXElement } from '@babel/types';
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { isBreakpoint } from '../../global/helpers/breakpoint';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { Day, handleKeyboardEvent } from './sbb-calendar.helper';

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

  /** Min and Max values converted to date */
  @State() private _min: Date;
  @State() private _max: Date;

  @Element() private _element: HTMLElement;

  /** Date adapter. */
  private _dateAdapter: NativeDateAdapter = new NativeDateAdapter();

  private _days: HTMLButtonElement[];

  /** A list of the day of the week, in two format (long and single char). */
  private _weekdays: { long: string; narrow: string }[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day[][];
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
  public changeWidthConfiguration(): void {
    this._setCalendarWidth();
  }

  @Watch('selectedDate')
  public selectedDateChanged(newDate: Date | string | number): void {
    const selectedDate = this._dateAdapter.deserializeDate(newDate);
    if (
      this._dateAdapter.isValid(selectedDate) &&
      (!this._disableDay(selectedDate.toISOString()) || this.dateFilter(selectedDate))
    ) {
      this._selected = selectedDate.toISOString();
    } else {
      this._selected = undefined;
    }
  }

  /* Focuses on a day cell. */
  @Method()
  public focusCell(): void {
    const toFocus = this._getFirstFocusable();
    toFocus?.focus();
  }

  /* Resets the active month according to the new state of the calendar. */
  @Method()
  public resetPosition(): void {
    this._setDates();
    this._init();
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

  /** Initialize the component. */
  private _init(): void {
    this._setCalendarWidth();
    this._setWeekdays();
    this._weeks = this._createWeekRows(this._activeDate.getMonth(), this._activeDate.getFullYear());
    this._nextMonthWeeks = this._wide
      ? this._createWeekRows(this._activeDate.getMonth() + 1, this._activeDate.getFullYear())
      : [[]];
  }

  /** Sets the date variables. */
  private _setDates(): void {
    const selectedDate = this._dateAdapter.deserializeDate(this.selectedDate);
    this._activeDate = selectedDate ?? this._dateAdapter.today();
    if (
      (!!selectedDate && !this._disableDay(selectedDate.toISOString())) ||
      this.dateFilter(selectedDate)
    ) {
      this._selected = selectedDate ? selectedDate.toISOString() : undefined;
    }
  }

  private _setCalendarWidth(): void {
    this._wide = isBreakpoint('medium') && this.wide;
  }

  /** Creates the array of weekdays. */
  private _setWeekdays(): void {
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
    const weekdays = longWeekdays.map((long, i) => ({ long, narrow: narrowWeekdays[i] }));

    // Rotate the labels for days of the week based on the configured first day of the week.
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }

  /** Create the rows for each week. */
  private _createWeekRows(month: number, year: number): Day[][] {
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(year, month);
    const dateNames = this._dateAdapter.getDateNames();
    const weeks = [[]];
    const weekOffset = this._dateAdapter.getFirstWeekOffset(year, month);
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === NativeDateAdapter.DAYS_PER_WEEK) {
        weeks.push([]);
        cell = 0;
      }
      weeks[weeks.length - 1].push({
        value: new Date(year, month, i + 1).toISOString(),
        dayValue: dateNames[i],
        monthValue: month + 1,
        yearValue: year,
      });
    }
    return weeks;
  }

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
    return this._weekdays.map((day: { long: string; narrow: string }) => (
      <th>
        <span class="visually-hidden">{day.long}</span>
        <span aria-hidden="true">{day.narrow}</span>
      </th>
    ));
  }

  /** Create the table body with the days cells. */
  private _createTableBody(weeks: Day[][]): JSX.Element {
    return weeks.map((week: Day[], rowIndex: number) => {
      const firstRowOffset = NativeDateAdapter.DAYS_PER_WEEK - week.length;
      if (rowIndex === 0 && firstRowOffset) {
        return (
          <tr>
            <td
              colSpan={firstRowOffset}
              data-day={`0 ${week[rowIndex].monthValue} ${week[rowIndex].yearValue}`}
            ></td>
            {this._createDayCells(week)}
          </tr>
        );
      }
      return <tr>{this._createDayCells(week)}</tr>;
    });
  }

  /** Create the cells for the days. */
  private _createDayCells(week: Day[]): JSX.Element {
    const today = this._dateAdapter.today().toISOString();
    return week.map((day: Day) => {
      const isOutOfRange = !this._disableDay(day.value);
      const selected = this._selected && day.value === this._selected;
      return (
        <td>
          <button
            class={{
              'sbb-datepicker__day': true,
              'sbb-datepicker__day-today': day.value === today,
              'sbb-datepicker__day-selected': selected,
              'sbb-datepicker__crossed-out': !isOutOfRange && !this.dateFilter(new Date(day.value)),
            }}
            onClick={() => this._selectDate(day.value)}
            disabled={isOutOfRange || !this.dateFilter(new Date(day.value))}
            aria-label={`${day.dayValue} ${day.monthValue} ${day.yearValue}`}
            aria-pressed={selected ? 'true' : 'false'}
            aria-disabled={isOutOfRange || !this.dateFilter(new Date(day.value)) ? 'true' : 'false'}
            data-day={`${day.dayValue} ${day.monthValue} ${day.yearValue}`}
            tabindex="-1"
            onKeyDown={(evt: KeyboardEvent) => handleKeyboardEvent(evt, this._days)}
          >
            {day.dayValue}
          </button>
        </td>
      );
    });
  }

  private _createMonthLabel(d: Date): JSXElement {
    const month = this._dateAdapter.getMonth(d);
    const year = this._dateAdapter.getYear(d);
    return (
      <span class="sbb-calendar__controls-month-label">
        {this._dateAdapter.getMonthNames('long')[month]} {year}
      </span>
    );
  }

  private _disableDay(date: string): boolean {
    if (
      (this._dateAdapter.isValid(this._min) &&
        this._dateAdapter.compareDate(this._min, new Date(date)) > 0) ||
      (this._dateAdapter.isValid(this._max) &&
        this._dateAdapter.compareDate(this._max, new Date(date)) < 0)
    ) {
      return false;
    }
    return true;
  }

  /** Emits the selected date and sets it internally. */
  private _selectDate(day: string): void {
    if (this._selected !== day) {
      this._selected = day;
      this.dateSelected.emit(new Date(day));
    }
  }

  private _nextMonthClicked(): void {
    const newActiveDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
    this._assignActiveDate(newActiveDate);
    this._init();
  }

  private _previousMonthClicked(): void {
    const newActiveDate = this._dateAdapter.addCalendarMonths(this._activeDate, -1);
    this._assignActiveDate(newActiveDate);
    this._init();
  }

  private _previousMonthEnabled(): boolean {
    if (!this._min) {
      return false;
    }
    const prevMonth = this._dateAdapter.clone(this._activeDate);
    prevMonth.setDate(0);
    return this._dateAdapter.compareDate(prevMonth, this._min) < 0;
  }

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
    let firstFocusable = this._element.shadowRoot.querySelector('.sbb-datepicker__day-selected');
    if (!firstFocusable) {
      firstFocusable = this._element.shadowRoot.querySelector('.sbb-datepicker__day-today');
    }
    if (!firstFocusable || (firstFocusable as HTMLButtonElement)?.disabled) {
      firstFocusable = Array.from(
        this._element.shadowRoot.querySelectorAll('.sbb-datepicker__day')
      ).find((e) => !(e as HTMLButtonElement).disabled);
    }
    return (firstFocusable as HTMLButtonElement) || null;
  }

  private _setTabIndex(): void {
    const currentlyActive = Array.from(
      this._element.shadowRoot.querySelectorAll('.sbb-datepicker__day[tabindex="0"]')
    );
    for (const day of currentlyActive) {
      (day as HTMLElement).tabIndex = -1;
    }
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
            onClick={() => this._previousMonthClicked()}
            disabled={this._previousMonthEnabled()}
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
            onClick={() => this._nextMonthClicked()}
            disabled={this._nextMonthEnabled()}
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
