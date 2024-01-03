export interface DateAdapter<T = any> {
  /**
   * Get the year as a number.
   * @param date
   */
  getYear: (date: T) => number;

  /**
   * Get the Month as a number.
   * @param date
   */
  getMonth: (date: T) => number;

  /**
   * Get the Day as a number.
   * @param date
   */
  getDate: (date: T) => number;

  /**
   * Get the Day of the week as a number.
   * @param date
   */
  getDayOfWeek: (date: T) => number;

  /**
   * Get the offset of the first day of the month from the first day of the week.
   * @param year
   * @param month
   */
  getFirstWeekOffset: (year: number, month: number) => number;

  /* Get the first day of the week (0: sunday; 1: monday; etc.). */
  getFirstDayOfWeek: () => number;

  /**
   * Get the number of days in a month.
   * @param year
   * @param month
   * */
  getNumDaysInMonth: (year: number, month: number) => number;

  /**
   * Get a list of all the months in a given style.
   * @param style
   */
  getMonthNames: (style: 'long' | 'short' | 'narrow') => string[];

  /** Get a string array with length = 31, filled with the days in a month, starting from 1. */
  getDateNames: () => string[];

  /**
   * Get a list of all the week days in a given style.
   * @param style
   */
  getDayOfWeekNames: (style: 'long' | 'short' | 'narrow') => string[];

  /** Creates today's date. */
  today: () => T;

  /**
   * Checks whether a given `date` is valid.
   * @param date
   * */
  isValid: (date: T) => boolean;

  /** Creates a new date by cloning the given one.
   * @param date
   * */
  clone(date: T): T;

  /**
   * Creates a new date, given day, month and year; without date's overflow.
   * @param year
   * @param month
   * @param date
   * */
  createDate: (year: number, month: number, date: number) => T;

  /**
   * Creates a new date given a ISO String.
   * @param date The ISO String to convert to date.
   * */
  createDateFromISOString: (date: string) => T | null;

  /**
   * Creates a Date from a valid input.
   * @param date Either Date, ISOString, Unix Timestamp (number of seconds since Jan 1, 1970).
   * @returns The date if the input is valid, `null` otherwise.
   * */
  deserializeDate: (date: T | string | number) => T | null;

  /**
   * Checks whether the two dates are non-null and are in the same month of the same year.
   * @param first
   * @param second
   * */
  hasSameMonthAndYear: (first: T | null, second: T | null) => boolean;

  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  compareDate: (first: T, second: T) => number;

  /**
   * Creates a new date adding the number of provided `years` to the provided `date`.
   * @param date The starting date.
   * @param years The number of years to add.
   */
  addCalendarYears: (date: T, years: number) => T;

  /**
   * Creates a new date adding the number of provided `months` to the provided `date`.
   * If the calculated month has fewer days than the original one, the date is set to the last day of the month.
   * E.g. with `date` = new Date(2022, 0, 31) and `months` = 1, it returns new Date(2022, 1, 28).
   * @param date The starting date.
   * @param months The number of months to add.
   */
  addCalendarMonths: (date: T, months: number) => T;

  /** Creates a new date by adding the number of provided `days` to the provided `date`.
   * @param date The starting date.
   * @param days The number of days to add.
   */
  addCalendarDays: (date: T, days: number) => T;

  /**
   * Calculates the first year that will be shown in the year selection panel.
   * @param activeDate The active date.
   * @param minDate The minimum date, if set.
   * @param maxDate The maximum date, if set.
   */
  getStartValueYearView: (activeDate: T, minDate: T | null, maxDate: T | null) => number;

  /** Get the date in the local format.
   * @param date The date to format
   * @returns The `date` in the local format as string.
   */
  getAccessibilityFormatDate: (date: T | string) => string;

  /** Get the given string as Date.
   * @param value The date in the format DD.MM.YYYY.
   * @param now The current date as Date.
   */
  parseDate: (value: string, now: Date) => T;

  /** Format the given Date as string.
   * @param value The date to format.
   */
  format: (date: T) => string;

  /** Checks whether the given `obj` is a Date.
   * @param obj The object to check.
   */
  isDateInstance: (obj: any) => boolean;

  /** Get the given date as ISO String.
   * @param date The date to convert to ISO String.
   */
  getISOString: (date: T) => string;
}
