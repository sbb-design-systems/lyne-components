import { LanguageController } from '../common-behaviors';
import { SbbDateLike } from '../interfaces';

import { DateAdapter } from './date-adapter';

export const DAYS_PER_ROW: number = 7;
export const MONTHS_PER_ROW: number = 4;
export const YEARS_PER_ROW: number = 4;
export const YEARS_PER_PAGE: number = 24;
export const FORMAT_DATE =
  /(^0?[1-9]?|[12]?[0-9]?|3?[01]?)[.,\\/\-\s](0?[1-9]?|1?[0-2]?)?[.,\\/\-\s](\d{1,4}$)?/;

export class NativeDateAdapter implements DateAdapter<Date> {
  private _cutoffYearOffset: number;

  public constructor(cutoffYearOffset: number = 15) {
    this._cutoffYearOffset = cutoffYearOffset;
  }

  /**
   * Calculates the day of the week of the first day of the month, and then its offset from the first day of the week.
   */
  public getFirstWeekOffset(year: number, month: number): number {
    const firstOfMonth = this.createDate(year, month, 1);
    return (
      (DAYS_PER_ROW + this.getDayOfWeek(firstOfMonth) - this.getFirstDayOfWeek()) % DAYS_PER_ROW
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
    return new Intl.DateTimeFormat(LanguageController.current, options).format(new Date(date));
  }

  /**
   * Creates an array of strings with length = 12, filled with the name of the months starting from January, in the document language.
   * @param style See `month` in `DateTimeFormatOptions`: `long` for full name, `short` for short name, `narrow` for single letter,
   * E.g., with January in en-gb: `long` returns "January", `short` returns "Jan", `narrow` returns "J".
   */
  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(LanguageController.current, { month: style });
    return this._range(12, (i) => formatter.format(new Date(2017, i, 1)));
  }

  /** Creates a string array with length = 31, filled with the days in a month, starting from 1. */
  public getDateNames(): string[] {
    const formatter = new Intl.DateTimeFormat(LanguageController.current, { day: 'numeric' });
    return this._range(31, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /**
   * Creates a string array with length = 7, filled with the name of the days in a week starting from Sunday, in the document language.
   * @param style See `weekday` in `DateTimeFormatOptions` - 'long' for full name, 'short' for short name, 'narrow' for single letter;
   * E.g., with Monday in en-gb: `long` returns "Monday", `short` returns "Mon", `narrow` returns "M".
   */
  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(LanguageController.current, { weekday: style });
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
  public createDate(year: number, month: number, date: number): Date | undefined {
    // Check for invalid month and date (except upper bound on date which we have to check after creating the Date).
    if (month < 0 || month > 11) {
      return undefined;
    }

    if (date < 1) {
      return undefined;
    }

    const result = this._createDateWithOverflow(year, month, date);
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() !== month) {
      return undefined;
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
   * Creates a new date adding the number of provided `years` to the provided `date`.
   * @param date The starting date.
   * @param years The number of years to add.
   */
  public addCalendarYears(date: Date, years: number): Date {
    return this.addCalendarMonths(date, years * 12);
  }

  /**
   * Creates a new date adding the number of provided `months` to the provided `date`.
   * If the calculated month has fewer days than the original one, the date is set to the last day of the month.
   * E.g., with `date` = new Date(2022, 0, 31) and `months` = 1, it returns new Date(2022, 1, 28).
   */
  public addCalendarMonths(date: Date, months: number): Date {
    const targetMonth = date.getMonth() + months;
    const dateWithCorrectMonth = new Date(date.getFullYear(), targetMonth, 1, 0, 0, 0, 0);
    const daysInMonth = this.getNumDaysInMonth(
      this.getYear(dateWithCorrectMonth),
      this.getMonth(dateWithCorrectMonth),
    );
    // Adapt the last day of month for shorter months
    return new Date(this.clone(date).setMonth(targetMonth, Math.min(daysInMonth, date.getDate())));
  }

  /** Creates a new date by adding the number of provided `days` to the provided `date`. */
  public addCalendarDays(date: Date, days: number): Date {
    const targetDay = date.getDate() + days;
    return new Date(date.getFullYear(), date.getMonth(), targetDay, 0, 0, 0, 0);
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
  public getStartValueYearView(
    activeDate: Date,
    minDate: Date | null,
    maxDate: Date | null,
  ): number {
    let startingYear: number = 0;
    if (maxDate) {
      startingYear = this.getYear(maxDate) - YEARS_PER_PAGE + 1;
    } else if (minDate) {
      startingYear = this.getYear(minDate);
    }
    const activeYear: number = this.getYear(activeDate);
    return (
      activeYear -
      ((((activeYear - startingYear) % YEARS_PER_PAGE) + YEARS_PER_PAGE) % YEARS_PER_PAGE)
    );
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
  public deserializeDate(date: SbbDateLike): Date | null {
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
  public parseDate(value: string): Date {
    if (!value) {
      return undefined;
    }

    const strippedValue = value.replace(/\D/g, ' ').trim();

    const match: RegExpMatchArray = strippedValue?.match(FORMAT_DATE);
    if (
      !match ||
      match.index !== 0 ||
      match.length <= 2 ||
      match.some((e) => e === undefined) ||
      !this.isValid(this.createDate(+match[3], +match[2] - 1, +match[1]))
    ) {
      return undefined;
    }

    let year = +match[3];

    if (typeof year === 'number' && year < 100 && year >= 0) {
      const shift = new Date().getFullYear() - 2000 + this._cutoffYearOffset;
      year = year <= shift ? 2000 + year : 1900 + year;
    }

    return new Date(year, +match[2] - 1, +match[1]);
  }

  public format(value: Date): string {
    if (!value) {
      return '';
    }
    const locale = `${LanguageController.current}-CH`;
    const dateFormatter = new Intl.DateTimeFormat('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const dayFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    });

    let weekday = dayFormatter.format(value);
    weekday = weekday.charAt(0).toUpperCase() + weekday.charAt(1);

    return `${weekday}, ${dateFormatter.format(value)}`;
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

export const defaultDateAdapter = new NativeDateAdapter();
