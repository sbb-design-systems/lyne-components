import { documentLanguage } from './language';

// FIXME for missing utils, see:
//  https://github.com/sbb-design-systems/sbb-angular/blob/main/src/angular/core/datetime/native-date-adapter.ts
export class NativeDateAdapter {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static readonly DAYS_PER_WEEK = 7;

  /** Creates an array and fills it with values. */
  private _range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
      valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
  }

  /** Calculate the first week offset. */
  public getFirstWeekOffset(year: number, month: number): number {
    const firstOfMonth = this.createDate(year, month, 1);
    return (
      (NativeDateAdapter.DAYS_PER_WEEK +
        this.getDayOfWeek(firstOfMonth) -
        this.getFirstDayOfWeek()) %
      NativeDateAdapter.DAYS_PER_WEEK
    );
  }

  public getYear(date: Date): number {
    return date.getFullYear();
  }

  public getMonth(date: Date): number {
    return date.getMonth();
  }

  public getDate(date: Date): number {
    return date.getDate();
  }

  public getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(documentLanguage(), { month: style });
    return this._range(12, (i) => formatter.format(new Date(2017, i, 1)));
  }

  public getDateNames(): string[] {
    const formatter = new Intl.DateTimeFormat(documentLanguage(), { day: 'numeric' });
    return this._range(31, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /**
   * Creates an array of days starting from Sunday in the given format.
   * @param style - 'long' for full name, 'short' for short name, 'narrow' for single letter.
   */
  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(documentLanguage(), { weekday: style });
    return this._range(7, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /* Define which is the first day of the week (0: sunday; 1: monday; etc.)*/
  public getFirstDayOfWeek(): number {
    return 1;
  }

  public getNumDaysInMonth(year: number, month: number): number {
    const lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, month + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
  }

  public today(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public cloneDate(d: Date): Date {
    const clone = this.createDate(d.getFullYear(), d.getMonth(), d.getDate());
    return clone;
  }

  public createDate(year: number, month: number, date: number): Date {
    // Check for invalid month and date (except upper bound on date which we have to check after creating the Date).
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createDateWithOverflow(year, month, date);
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() !== month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  /**
   * Takes a day of the month and returns a new date in the same month and year as the currently
   *  active date. The returned date will have the same day of the month as the argument date.
   */
  public getDateFromDayOfMonth(dayOfMonth: number, activeDate: Date): Date {
    return this.createDate(this.getYear(activeDate), this.getMonth(activeDate), dayOfMonth);
  }

  /**
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */
  public getDateInCurrentMonth(date: Date | null, activeDate: Date | null): number | null {
    return date && this._hasSameMonthAndYear(date, activeDate) ? this.getDate(date) : null;
  }

  /** Creates a date but allows the month and date to overflow. */
  private _createDateWithOverflow(year: number, month: number, date: number): Date {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }

  /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
  private _hasSameMonthAndYear(d1: Date | null, d2: Date | null): boolean {
    return !!(
      d1 &&
      d2 &&
      this.getMonth(d1) === this.getMonth(d2) &&
      this.getYear(d1) === this.getYear(d2)
    );
  }

  public isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  public isValid(date: Date): boolean {
    return !!date && !isNaN(date.valueOf());
  }

  public invalid(): Date {
    return new Date(NaN);
  }

  public clone(date: Date): Date {
    return new Date(date.valueOf());
  }

  public addCalendarMonths(date: Date, months: number): Date {
    const targetMonth = date.getMonth() + months;
    const dateWithCorrectMonth = new Date(0);
    dateWithCorrectMonth.setFullYear(date.getFullYear(), targetMonth, 1);
    dateWithCorrectMonth.setHours(0, 0, 0, 0);
    const daysInMonth = this.getNumDaysInMonth(
      this.getYear(dateWithCorrectMonth),
      this.getMonth(dateWithCorrectMonth)
    );
    const newDate = this.clone(date);
    // Adapt last day of month for shorter months
    newDate.setMonth(targetMonth, Math.min(daysInMonth, date.getDate()));
    return newDate;
  }

  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  public compareDate(first: Date, second: Date): number {
    return (
      this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second)
    );
  }

  public deserializeDate(date: Date | string | number): Date | null {
    if (typeof date === 'string') {
      if (!Number.isNaN(+date)) {
        return new Date(+date * 1000);
      }
      return new Date(date);
    } else if (typeof date === 'number') {
      return new Date(date * 1000);
    }
    if (date == null || (this.isDateInstance(date) && this.isValid(date))) {
      return date;
    }
    return this.invalid();
  }
}
