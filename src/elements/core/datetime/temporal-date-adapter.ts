/// <reference types="temporal-polyfill/global" />

import { SbbLanguageController } from '../controllers.ts';

import { DateAdapter } from './date-adapter.ts';

/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings and without of bounds month, date, etc.
 */
const ISO_8601_REGEX =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;

export class TemporalDateAdapter extends DateAdapter<Temporal.PlainDate> {
  /**
   * @param cutoffYearOffset The threshold on whether a two-digit year
   * should be treated as belonging to 2000 or 1900. e.g. with 15 (default)
   * the current year plus 15 will be treated as belonging to 2000, and the rest to 1900.
   * So e.g. with the current year 2025, 40 will be treated as 2040, while 41 will be treated as 1941.
   */
  public constructor(cutoffYearOffset?: number) {
    super(cutoffYearOffset);
    if (typeof Temporal !== 'object') {
      throw new Error(
        'Temporal is not available in the current environment. Please make sure to include the temporal polyfill.',
      );
    }
  }

  /** Gets the year of the input date. */
  public getYear(date: Temporal.PlainDate): number {
    return date.year;
  }

  /** Gets the month of the input date. */
  public getMonth(date: Temporal.PlainDate): number {
    return date.month;
  }

  /** Gets the day of the input date. */
  public getDate(date: Temporal.PlainDate): number {
    return date.day;
  }

  /** Gets the day of the week of the input date. */
  public getDayOfWeek(date: Temporal.PlainDate): number {
    // Our expectation is 0 = Sunday but Temporal.PlainDate.dayOfWeek returns 7 = Sunday
    // TODO: Remove this with a future release.
    return date.dayOfWeek % 7;
  }

  /** Gets the date in the local format. */
  public getAccessibilityFormatDate(date: Temporal.PlainDate | string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return this.deserialize(date)!.toLocaleString(SbbLanguageController.current, options);
  }

  /**
   * Creates an array of strings with length = 12, filled with the name of the months starting from January, in the document language.
   * @param style See `month` in `DateTimeFormatOptions`: `long` for full name, `short` for short name, `narrow` for single letter,
   * E.g., with January in en-gb: `long` returns "January", `short` returns "Jan", `narrow` returns "J".
   */
  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(SbbLanguageController.current, { month: style });
    return this._range(12, (i) =>
      formatter.format(Temporal.PlainDate.from({ year: 2017, month: i + 1, day: 1 })),
    );
  }

  /** Creates a string array with length = 31, filled with the days in a month, starting from 1. */
  public getDateNames(): string[] {
    const formatter = new Intl.DateTimeFormat(SbbLanguageController.current, { day: 'numeric' });
    return this._range(31, (i) =>
      formatter.format(Temporal.PlainDate.from({ year: 2017, month: 1, day: i + 1 })),
    );
  }

  /**
   * Creates a string array with length = 7, filled with the name of the days in a week starting from Sunday, in the document language.
   * @param style See `weekday` in `DateTimeFormatOptions` - 'long' for full name, 'short' for short name, 'narrow' for single letter;
   * E.g., with Monday in en-gb: `long` returns "Monday", `short` returns "Mon", `narrow` returns "M".
   */
  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(SbbLanguageController.current, { weekday: style });
    return this._range(7, (i) =>
      formatter.format(Temporal.PlainDate.from({ year: 2017, month: 1, day: i + 1 })),
    );
  }

  /** Defines which is the first day of the week (0: sunday; 1: monday; etc.). */
  public getFirstDayOfWeek(): number {
    return 1;
  }

  /** Calculates the number of days in a month given the year and the month. */
  public getNumDaysInMonth(date: Temporal.PlainDate): number {
    return date.daysInMonth;
  }

  /** Creates today's date. */
  public today(): Temporal.PlainDate {
    return Temporal.Now.plainDateISO();
  }

  /** Creates a new date, given day, month and year; the method doesn't allow date's overflow. */
  public createDate(year: number, month: number, day: number): Temporal.PlainDate {
    // Check for invalid month and date (except upper bound on date which we have to check after creating the Temporal.PlainDate).
    if (month < 1 || month > 12) {
      throw Error(`Invalid month "${month}". Month has to be between 1 and 12.`);
    } else if (day < 1) {
      throw Error(`Invalid day "${day}". Day has to be greater than 0.`);
    }

    try {
      return Temporal.PlainDate.from({ year, month, day: day }, { overflow: 'reject' });
    } catch {
      throw Error(`Invalid date "${day}" for month with index "${month}".`);
    }
  }

  /** Checks whether the given `obj` is a Temporal.PlainDate. */
  public isDateInstance(obj: any): boolean {
    return obj instanceof Temporal.PlainDate;
  }

  /** Checks whether the given `date` is a valid Temporal.PlainDate. */
  public isValid(date: Temporal.PlainDate | null | undefined): date is Temporal.PlainDate {
    return this.isDateInstance(date);
  }

  /** Creates a new date by cloning the given one. */
  public clone(date: Temporal.PlainDate): Temporal.PlainDate {
    return Temporal.PlainDate.from(date);
  }

  /**
   * Creates a new date adding the number of provided `years` to the provided `date`.
   * @param date The starting date.
   * @param years The number of years to add.
   */
  public addCalendarYears(date: Temporal.PlainDate, years: number): Temporal.PlainDate {
    return date.add({ years });
  }

  /**
   * Creates a new date adding the number of provided `months` to the provided `date`.
   * If the calculated month has fewer days than the original one, the date is set to the last day of the month.
   * E.g., with `date` = new Temporal.PlainDate(2022, 0, 31) and `months` = 1, it returns new Temporal.PlainDate(2022, 1, 28).
   */
  public addCalendarMonths(date: Temporal.PlainDate, months: number): Temporal.PlainDate {
    return date.add({ months });
  }

  /** Creates a new date by adding the number of provided `days` to the provided `date`. */
  public addCalendarDays(date: Temporal.PlainDate, days: number): Temporal.PlainDate {
    return date.add({ days });
  }

  /** Creates a Temporal.PlainDate from a valid input (Temporal.PlainDate or ISO string). */
  public override deserialize(
    date: Temporal.PlainDate | string | null | undefined,
  ): Temporal.PlainDate | null {
    if (typeof date === 'string') {
      if (!date) {
        return null;
      } else if (ISO_8601_REGEX.test(date)) {
        // `Temporal.PlainDate.from` only accepts ISO 8601 date strings without time components.
        return this.getValidDateOrNull(Temporal.PlainDate.from(date.split('T')[0]));
      }
    }
    return super.deserialize(date);
  }

  public override invalid(): Temporal.PlainDate {
    // It is not possible to create an invalid Temporal.PlainDate, so we return null.
    return null!;
  }

  public override toIso8601(date: Temporal.PlainDate): string {
    return date.toJSON();
  }

  /**
   * Creates an array with the given length and fills it by mapping with the provided function.
   * @param length The length of the array to be created.
   * @param valueFunction The function of array's index used to fill the array.
   */
  private _range<T>(length: number, valueFunction: (index: number) => T): T[] {
    return Array.from({ length }).map((_, i) => valueFunction(i));
  }
}
