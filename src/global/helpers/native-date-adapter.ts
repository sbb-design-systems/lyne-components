import { DateAdapter } from '../interfaces/date-adapter';
import { documentLanguage } from './eventing/language-change-handler';

export const DAYS_PER_WEEK = 7;

export class NativeDateAdapter implements DateAdapter<Date> {
  /**
   * Calculates the day of the week of the first day of the month, and then its offset from the first day of the week.
   */
  public getFirstWeekOffset(year: number, month: number): number {
    const firstOfMonth = this.createDate(year, month, 1);
    return (
      (DAYS_PER_WEEK + this.getDayOfWeek(firstOfMonth) - this.getFirstDayOfWeek()) % DAYS_PER_WEEK
    );
  }

  /** Gets the year of the input date. */
  public getYear(date: Date): number {
    return date.getFullYear();
  }

  /** Gets the month of the input date. */
  public getMonth(date: Date): number {
    return date.getMonth();
  }

  /** Gets the day of the input date. */
  public getDate(date: Date): number {
    return date.getDate();
  }

  /** Gets the day of the week of the input date. */
  public getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  /** Gets the date in the local format. */
  public getAccessibilityFormatDate(date: Date | string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat(documentLanguage(), options).format(new Date(date));
  }

  /**
   * Creates an array of strings with length = 12, filled with the name of the months starting from January, in the document language.
   * @param style See `month` in `DateTimeFormatOptions`: `long` for full name, `short` for short name, `narrow` for single letter,
   * E.g., with January in en-gb: `long` returns "January", `short` returns "Jan", `narrow` returns "J".
   */
  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(documentLanguage(), { month: style });
    return this._range(12, (i) => formatter.format(new Date(2017, i, 1)));
  }

  /** Creates a string array with length = 31, filled with the days in a month, starting from 1. */
  public getDateNames(): string[] {
    const formatter = new Intl.DateTimeFormat(documentLanguage(), { day: 'numeric' });
    return this._range(31, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /**
   * Creates a string array with length = 7, filled with the name of the days in a week starting from Sunday, in the document language.
   * @param style See `weekday` in `DateTimeFormatOptions` - 'long' for full name, 'short' for short name, 'narrow' for single letter;
   * E.g., with Monday in en-gb: `long` returns "Monday", `short` returns "Mon", `narrow` returns "M".
   */
  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(documentLanguage(), { weekday: style });
    return this._range(7, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /* Defines which is the first day of the week (0: sunday; 1: monday; etc.). */
  public getFirstDayOfWeek(): number {
    return 1;
  }

  /** Calculates the number of days in a month given the year and the month. */
  public getNumDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0, 0, 0, 0, 0).getDate();
  }

  /** Creates today's date. */
  public today(): Date {
    return new Date(new Date().setHours(0, 0, 0, 0));
  }

  /** Creates a new date, given day, month and year; the method doesn't allow date's overflow. */
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

  public createDateFromISOString(date: string): Date | null {
    const d = new Date(date);
    return this.isValid(d) ? d : null;
  }

  /** Checks whether the two dates are non-null and are in the same month of the same year. */
  public hasSameMonthAndYear(first: Date | null, second: Date | null): boolean {
    return !!(
      first &&
      second &&
      this.getMonth(first) === this.getMonth(second) &&
      this.getYear(first) === this.getYear(second)
    );
  }

  /** Checks whether the given `obj` is a Date. */
  public isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  /** Checks whether the given `date` is a valid Date. */
  public isValid(date: Date): boolean {
    return !!date && !isNaN(date.valueOf());
  }

  /** Creates a new date by cloning the given one. */
  public clone(date: Date): Date {
    return new Date(date.valueOf());
  }

  /**
   * Creates a new date adding the number of provided `months` to the provided `date`.
   * If the calculated month has fewer days than the original one, the date is set to the last day of the month.
   * E.g. with `date` = new Date(2022, 0, 31) and `months` = 1, it returns new Date(2022, 1, 28).
   */
  public addCalendarMonths(date: Date, months: number): Date {
    const targetMonth = date.getMonth() + months;
    const dateWithCorrectMonth = new Date(date.getFullYear(), targetMonth, 1, 0, 0, 0, 0);
    const daysInMonth = this.getNumDaysInMonth(
      this.getYear(dateWithCorrectMonth),
      this.getMonth(dateWithCorrectMonth)
    );
    // Adapt last day of month for shorter months
    return new Date(this.clone(date).setMonth(targetMonth, Math.min(daysInMonth, date.getDate())));
  }

  /** Creates a new date by adding the number of provided `days` to the provided `date`. */
  public addCalendarDays(date: Date, days: number): Date {
    const targetDay = date.getDate() + days;
    return new Date(date.getFullYear(), date.getMonth(), targetDay, 0, 0, 0, 0);
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

  /** Creates a Date from a valid input (Date, string or number in seconds). */
  public deserializeDate(date: Date | string | number): Date | null {
    if (!date) {
      return null;
    }
    if (typeof date === 'string') {
      if (!Number.isNaN(+date)) {
        return new Date(+date * 1000);
      }
      return new Date(date);
    } else if (typeof date === 'number') {
      return new Date(date * 1000);
    }
    if (this.isDateInstance(date) && this.isValid(date)) {
      return date;
    }
    return null;
  }

  /** Returns the right format for the `valueAsDate` property. */
  public formatValueAsDate(value: string): Date {
    const values = value?.split('.');
    if (!values || values.length <= 2 || values.some((v) => v === '')) {
      return undefined;
    }
    return new Date(+values[2], +values[1] - 1, +values[0], 0, 0, 0, 0);
  }

  public getISOString(date: Date): string {
    date?.setHours(0, 0, 0, 0);
    return date?.toISOString();
  }

  /**
   * Creates an array with the given length and fills it by mapping with the provided function.
   * @param length The length of the array to be created.
   * @param valueFunction The function of array's index used to fill the array.
   */
  private _range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
      valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
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
}
