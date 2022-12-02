import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';

@Component({
  shadow: true,
  styleUrl: 'sbb-calendar.scss',
  tag: 'sbb-calendar',
})
export class SbbCalendar implements ComponentInterface {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. */
  @Prop() public min: Date;

  /** The maximum valid date. */
  @Prop() public max: Date;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean;

  /** The selected date. */
  @Prop() public selectedDate: Date;

  /** Event emitted on date selection. */
  @Event({
    eventName: 'date-selected',
  })
  public dateSelected: EventEmitter<Date>;

  /** Date adapter. */
  private _nativeDateAdapter: NativeDateAdapter = new NativeDateAdapter();

  /** A list of the day of the week, in two format (long and single char). */
  private _weekdays: { long: string; narrow: string }[];

  /** The currently active date. */
  private _activeDate: Date;

  /** The selected date. */
  @State() private _selected: number;

  /** The date of the current day. */
  private _today: number;

  /** The name of the displayed month. */
  private _monthLabel: string;

  /** The number of blank cells in the first row before the 1st of the month. */
  private _firstWeekOffset: number;

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: { value: number; displayValue: string }[][];

  public connectedCallback(): void {
    this._init();
  }

  /** Initialize the component. */
  private _init(): void {
    this._setWeekdays();
    this._setDates();
    this._setMonthLabel();
    this._setFirstWeekOffset();
    this._createWeekRows();
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

  /** Sets the date variables. */
  private _setDates(): void {
    this._activeDate = this._nativeDateAdapter.today();
    this._selected = this._nativeDateAdapter.getDateInCurrentMonth(
      this.selectedDate,
      this._activeDate
    );
    this._today = this._nativeDateAdapter.getDateInCurrentMonth(
      this._nativeDateAdapter.today(),
      this._activeDate
    );
  }

  /** Sets the label for the displayed month. */
  private _setMonthLabel(): void {
    this._monthLabel =
      this._nativeDateAdapter.getMonthNames('long')[
        this._nativeDateAdapter.getMonth(this._activeDate)
      ];
  }

  /** Sets the first week offset. */
  private _setFirstWeekOffset(): void {
    const firstOfMonth = this._nativeDateAdapter.createDate(
      this._nativeDateAdapter.getYear(this._activeDate),
      this._nativeDateAdapter.getMonth(this._activeDate),
      1
    );
    this._firstWeekOffset =
      (NativeDateAdapter.DAYS_PER_WEEK +
        this._nativeDateAdapter.getDayOfWeek(firstOfMonth) -
        this._nativeDateAdapter.getFirstDayOfWeek()) %
      NativeDateAdapter.DAYS_PER_WEEK;
  }

  /** Create the rows for each week. */
  private _createWeekRows(): void {
    const daysInMonth = this._nativeDateAdapter.getNumDaysInMonth(this._activeDate);
    const dateNames = this._nativeDateAdapter.getDateNames();
    this._weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
      if (cell === NativeDateAdapter.DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      this._weeks[this._weeks.length - 1].push({ value: i + 1, displayValue: dateNames[i] });
    }
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
  private _createTableBody(): JSX.Element {
    return this._weeks.map((week: { value: number; displayValue: string }[], rowIndex: number) => {
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

  /**
   * Create the cells for the days.
   * FIXME: check selected and active states.
   */
  private _createDayCells(
    week: { value: number; displayValue: string }[],
    rowIndex: number,
    firstRowOffset?: number
  ): JSX.Element {
    return week.map((day: { value: number; displayValue: string }, colIndex: number) => (
      <td>
        <button
          class={{
            'sbb-datepicker__day-today': day.value === this._today,
            'sbb-datepicker__day-selected': day.value === this._selected,
            'sbb-datepicker__day-active': this._isActiveCell(rowIndex, colIndex, firstRowOffset),
          }}
          onClick={() => this._selectDate(day.value)}
        >
          {day.displayValue}
        </button>
      </td>
    ));
  }

  /** Emits the selected date and sets it internally. */
  private _selectDate(day: number): void {
    if (this._selected !== day) {
      this._selected = day;
      const selectedDate = this._nativeDateAdapter.getDateFromDayOfMonth(day, this._activeDate);
      this.dateSelected.emit(selectedDate);
    }
  }

  /**
   * Sets the active date.
   * FIXME: check it, not working as expected.
   * */
  private _isActiveCell(rowIndex: number, colIndex: number, firstRowOffset?: number): boolean {
    let cellNumber = rowIndex * NativeDateAdapter.DAYS_PER_WEEK + colIndex;

    // Account for the fact that the first row may not have as many cells.
    if (firstRowOffset) {
      cellNumber -= firstRowOffset;
    }

    return cellNumber === this._nativeDateAdapter.getDate(this._activeDate) - 1;
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-calendar__wrapper">
        <div class="sbb-calendar__controls">
          <sbb-button variant="secondary" iconName="chevron-left-small"></sbb-button>
          <span class="sbb-calendar__controls-month">{this._monthLabel}</span>
          <sbb-button variant="secondary" iconName="chevron-right-small"></sbb-button>
        </div>
        <table class="sbb-calendar__table">
          <thead class="sbb-calendar__table-header">
            <tr class="sbb-calendar__table-header-row">{this._createTableHeader()}</tr>
          </thead>
          <tbody class="sbb-calendar__table-body">{this._createTableBody()}</tbody>
        </table>
      </div>
    );
  }
}
