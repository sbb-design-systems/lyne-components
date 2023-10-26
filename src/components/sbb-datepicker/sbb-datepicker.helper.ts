import { DateAdapter, NativeDateAdapter } from '../core/datetime';
import { findReferencedElement } from '../core/dom';
import type { SbbDatepickerPreviousDay } from '../sbb-datepicker-previous-day';
import type { SbbDatepickerNextDay } from '../sbb-datepicker-next-day';
import type { SbbDatepickerToggle } from '../sbb-datepicker-toggle';
import type { SbbDatepicker } from './sbb-datepicker';

export interface InputUpdateEvent {
  disabled: boolean;
  readonly: boolean;
  min: string | number;
  max: string | number;
}

/**
 * Given a SbbDatepickerPreviousDay, a SbbDatepickerNextDay or a SbbDatepickerToggle component,
 * it returns the related SbbDatepicker reference, if exists.
 * @param element The element potentially connected to the SbbDatepicker.
 * @param trigger The id or the reference of the SbbDatePicker.
 */
export function getDatePicker(
  element: SbbDatepickerPreviousDay | SbbDatepickerNextDay | SbbDatepickerToggle,
  trigger?: string | HTMLElement,
): SbbDatepicker {
  if (!trigger) {
    const parent = element.closest('sbb-form-field');
    return parent?.querySelector('sbb-datepicker');
  }

  return findReferencedElement<SbbDatepicker>(trigger);
}

/**
 * Returns the first available date before or after a given one, considering the SbbDatepicker `dateFilter` property.
 * @param date The starting date for calculations.
 * @param delta The number of days to add/subtract from the starting one.
 * @param dateFilter The dateFilter function from the SbbDatepicker.
 * @param dateAdapter The adapter class.
 */
export function getAvailableDate(
  date: Date,
  delta: number,
  dateFilter: (date: Date) => boolean,
  dateAdapter: DateAdapter<Date>,
): Date {
  let availableDate = dateAdapter.addCalendarDays(date, delta);

  if (dateFilter) {
    while (!dateFilter(availableDate)) {
      availableDate = dateAdapter.addCalendarDays(availableDate, delta);
    }
  }

  return availableDate;
}

/**
 * Calculates the first available date before the given one,
 * considering the SbbDatepicker `dateFilter` property and `min` parameter (e.g. from the self-named input's attribute).
 * @param date The starting date for calculations.
 * @param dateFilter The dateFilter function from the SbbDatepicker.
 * @param dateAdapter The adapter class.
 * @param min The minimum value to consider in calculations.
 */
export function findPreviousAvailableDate(
  date: Date,
  dateFilter: (date: Date) => boolean,
  dateAdapter: DateAdapter<Date>,
  min: string | number,
): Date {
  const previousDate = getAvailableDate(date, -1, dateFilter, dateAdapter);
  const dateMin: Date = dateAdapter.deserializeDate(min);

  if (
    !dateMin ||
    (dateAdapter.isValid(dateMin) && dateAdapter.compareDate(previousDate, dateMin) >= 0)
  ) {
    return previousDate;
  }
  return date;
}

/**
 * Calculates the first available date after the given one,
 * considering the SbbDatepicker `dateFilter` property and `max` parameter (e.g. from the self-named input's attribute).
 * @param date The starting date for calculations.
 * @param dateFilter The dateFilter function from the SbbDatepicker.
 * @param dateAdapter The adapter class.
 * @param max The maximum value to consider in calculations.
 */
export function findNextAvailableDate(
  date: Date,
  dateFilter: (date: Date) => boolean,
  dateAdapter: DateAdapter<Date>,
  max: string | number,
): Date {
  const nextDate = getAvailableDate(date, 1, dateFilter, dateAdapter);
  const dateMax: Date = dateAdapter.deserializeDate(max);

  if (
    !dateMax ||
    (dateAdapter.isValid(dateMax) && dateAdapter.compareDate(nextDate, dateMax) <= 0)
  ) {
    return nextDate;
  }
  return date;
}

/**
 * Checks if the provided date is a valid one, considering the SbbDatepicker `dateFilter` property
 * and `min` and `max` parameters (e.g. from the self-named input's attributes).
 * @param date The starting date for calculations.
 * @param dateFilter The dateFilter function from the SbbDatepicker.
 * @param min The minimum value to consider in calculations.
 * @param max The maximum value to consider in calculations.
 */
export function isDateAvailable(
  date: Date,
  dateFilter: (date: Date) => boolean,
  min: string | number,
  max: string | number,
): boolean {
  const dateAdapter: DateAdapter<Date> = new NativeDateAdapter();
  const dateMin: Date = dateAdapter.deserializeDate(min);
  const dateMax: Date = dateAdapter.deserializeDate(max);

  if (
    (dateAdapter.isValid(dateMin) && dateAdapter.compareDate(date, dateMin) < 0) ||
    (dateAdapter.isValid(dateMax) && dateAdapter.compareDate(date, dateMax) > 0)
  ) {
    return false;
  }

  return dateFilter ? dateFilter(date) : true;
}

export const datepickerControlRegisteredEvent = new CustomEvent('datepicker-control-registered', {
  bubbles: false,
  composed: true,
});
