import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { isBreakpoint } from '../../global/helpers/breakpoint';
import { JSXElement } from '@babel/types';

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
  @Prop({ attribute: 'selected-date' }) public selectedDate: Date;

  /** Event emitted on date selection. */
  @Event({
    eventName: 'date-selected',
  })
  public dateSelected: EventEmitter<Date>;

  @Watch('min')
  public convertMinDate(newMin: Date | string | number): void {
    this._min = this._nativeDateAdapter.deserializeDate(newMin);
  }

  @Watch('max')
  public convertMaxDate(newMax: Date | string | number): void {
    this._max = this._nativeDateAdapter.deserializeDate(newMax);
  }

  @Watch('wide')
  public changeWidthConfiguration(): void {
    this._setCalendarWidth();
  }

  @Watch('selectedDate')
  public selectedDateChanged(newDate: Date): void {
    if (!this._disableDay(newDate.toISOString()) || this.dateFilter(newDate)) {
      this._selected = newDate.toISOString();
    }
  }

  @Method()
  public focus(): void {
    console.log('focus now');
  }

  public connectedCallback(): void {
    this.convertMinDate(this.min);
    this.convertMaxDate(this.max);

    window.addEventListener('resize', () => this._init(), {
      passive: true,
    });

    this._setDates();
    this._init();
  }

  /** The currently active date. */
  @State() private _activeDate: Date;

  /** The selected date. */
  @State() private _selected: string;

  /** The current width */
  @State() private _wide: boolean;

  /** Min and Max values converted to date */
  @State() private _min: Date;
  @State() private _max: Date;

  /** Date adapter. */
  private _nativeDateAdapter: NativeDateAdapter = new NativeDateAdapter();

  /** A list of the day of the week, in two format (long and single char). */
  private _weekdays: { long: string; narrow: string }[];

  /** The name of the displayed month. */
  //private _monthLabel: string;

  /** The number of blank cells in the first row before the 1st of the month. */
  //private _firstWeekOffset: number;

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: { value: string; displayValue: string }[][];
  private _nextMonthWeeks: { value: string; displayValue: string }[][];

  /** Initialize the component. */
  private _init(): void {
    this._setCalendarWidth();
    this._setWeekdays();
    //this._setMonthLabel();
    //this._firstWeekOffset = this._nativeDateAdapter.calcFirstWeekOffset(this._activeDate);
    this._weeks = this._createWeekRows(this._activeDate.getMonth(), this._activeDate.getFullYear());
    this._nextMonthWeeks = this._wide
      ? this._createWeekRows(this._activeDate.getMonth() + 1, this._activeDate.getFullYear())
      : [[]];
  }

  /** Sets the date variables. */
  private _setDates(): void {
    this._activeDate = this._nativeDateAdapter.today();
    if (
      (!!this.selectedDate && !this._disableDay(this.selectedDate.toISOString())) ||
      this.dateFilter(this.selectedDate)
    ) {
      this._selected = this.selectedDate ? this.selectedDate.toISOString() : undefined;
    }
  }

  private _setCalendarWidth(): void {
    this._wide = isBreakpoint('medium') && this.wide;
  }

  /** Creates the array of weekdays. */
  private _setWeekdays(): void {
    const narrowWeekdays = this._nativeDateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._nativeDateAdapter.getDayOfWeekNames('long');
    const weekdays = longWeekdays.map((long, i) => ({ long, narrow: narrowWeekdays[i] }));

    // Rotate the labels for days of the week based on the configured first day of the week.
    const firstDayOfWeek = this._nativeDateAdapter.getFirstDayOfWeek();
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }

  // /** Sets the label for the displayed month. */
  // private _setMonthLabel(): void {
  //   this._monthLabel =
  //     this._nativeDateAdapter.getMonthNames('long')[
  //       this._nativeDateAdapter.getMonth(this._activeDate)
  //     ];
  // }

  private _getMonthLabel(i: number): string {
    return this._nativeDateAdapter.getMonthNames('long')[i];
  }

  /** Create the rows for each week. */
  private _createWeekRows(
    month: number,
    year: number
  ): { value: string; displayValue: string }[][] {
    const daysInMonth = this._nativeDateAdapter.getNumDaysInMonth(new Date(year, month, 1));
    const dateNames = this._nativeDateAdapter.getDateNames();
    const weeks = [[]];
    const weekOffset = this._nativeDateAdapter.calcFirstWeekOffset(new Date(year, month, 1));
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === NativeDateAdapter.DAYS_PER_WEEK) {
        weeks.push([]);
        cell = 0;
      }
      weeks[weeks.length - 1].push({
        value: new Date(year, month, i + 1).toISOString(),
        displayValue: dateNames[i],
      });
    }
    return weeks;
  }

  private _createTable(weeks: { value: string; displayValue: string }[][]): JSXElement {
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
  private _createTableBody(weeks: { value: string; displayValue: string }[][]): JSX.Element {
    return weeks.map((week: { value: string; displayValue: string }[], rowIndex: number) => {
      const firstRowOffset = NativeDateAdapter.DAYS_PER_WEEK - week.length;
      if (rowIndex === 0 && firstRowOffset) {
        return (
          <tr>
            <td colSpan={firstRowOffset}></td>
            {this._createDayCells(week, rowIndex, firstRowOffset)}
          </tr>
        );
      }
      return <tr>{this._createDayCells(week, rowIndex)}</tr>;
    });
  }

  /** Create the cells for the days. */
  private _createDayCells(
    week: { value: string; displayValue: string }[],
    rowIndex: number,
    firstRowOffset?: number
  ): JSX.Element {
    const today = this._nativeDateAdapter.today().toISOString();
    return week.map((day: { value: string; displayValue: string }, colIndex: number) => {
      const isOutOfRange = !this._disableDay(day.value);
      const selected = this._selected && day.value === this._selected;
      return (
        <td>
          <button
            class={{
              'sbb-datepicker__day-today': day.value === today,
              'sbb-datepicker__day-selected': selected,
              'sbb-datepicker__crossed-out': !isOutOfRange && !this.dateFilter(new Date(day.value)),
              'sbb-datepicker__day-active': this._isActiveCell(rowIndex, colIndex, firstRowOffset),
            }}
            onClick={() => this._selectDate(day.value)}
            disabled={isOutOfRange || !this.dateFilter(new Date(day.value))}
            aria-label={this._getAriaLabel(day.value)}
            aria-pressed={selected ? 'true' : 'false'}
            aria-disabled={isOutOfRange || !this.dateFilter(new Date(day.value)) ? 'true' : 'false'}
            tabindex="-1"
          >
            {day.displayValue}
          </button>
        </td>
      );
    });
  }

  private _getAriaLabel(day: string): string {
    const dateObj = new Date(day);
    return `${dateObj.getDate()} ${dateObj.getMonth() + 1} ${dateObj.getFullYear()}`;
  }

  private _disableDay(date: string): boolean {
    if (
      (this._nativeDateAdapter.isValid(this._min) &&
        this._nativeDateAdapter.compareDate(this._min, new Date(date)) > 0) ||
      (this._nativeDateAdapter.isValid(this._max) &&
        this._nativeDateAdapter.compareDate(this._max, new Date(date)) < 0)
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

  /** Sets the active date. */
  private _isActiveCell(rowIndex: number, colIndex: number, firstRowOffset?: number): boolean {
    let cellNumber = rowIndex * NativeDateAdapter.DAYS_PER_WEEK + colIndex;

    // Account for the fact that the first row may not have as many cells.
    if (firstRowOffset) {
      cellNumber -= firstRowOffset;
    }

    return cellNumber === this._nativeDateAdapter.getDate(this._activeDate) - 1;
  }

  private _nextMonth(): void {
    const newActiveDate = this._nativeDateAdapter.addCalendarMonths(
      this._activeDate,
      this._wide ? 2 : 1
    );
    this._assignActiveDate(newActiveDate);
    this._init();
  }

  private _previousMonth(): void {
    const newActiveDate = this._nativeDateAdapter.addCalendarMonths(
      this._activeDate,
      this._wide ? -2 : -1
    );
    this._assignActiveDate(newActiveDate);
    this._init();
  }

  private _assignActiveDate(date: Date): void {
    if (
      this._nativeDateAdapter.isValid(this._min) &&
      this._nativeDateAdapter.compareDate(this._min, date) > 0
    ) {
      this._activeDate = this._min;
    } else if (
      this._nativeDateAdapter.isValid(this._max) &&
      this._nativeDateAdapter.compareDate(this._max, date) < 0
    ) {
      this._activeDate = this._max;
    } else {
      this._activeDate = date;
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
            onClick={() => this._previousMonth()}
          ></sbb-button>
          <div class="sbb-calendar__controls-month">
            <span class="sbb-calendar__controls-month-label">
              {this._getMonthLabel(this._nativeDateAdapter.getMonth(this._activeDate))}
            </span>
            {this._wide && (
              <span class="sbb-calendar__controls-month-label">
                {this._getMonthLabel(this._nativeDateAdapter.getMonth(this._activeDate) + 1)}
              </span>
            )}
          </div>
          <sbb-button
            variant="secondary"
            iconName="chevron-small-right-small"
            size="m"
            onClick={() => this._nextMonth()}
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
