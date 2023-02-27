import { hostContext } from '../../global/helpers/host-context';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';

/**
 * Given a SbbDatepickerPreviousDay or a SbbDatepickerNextDay component, returns the related SbbDatepicker reference.
 */
export function getDatePicker(
  element:
    | HTMLSbbDatepickerPreviousDayElement
    | HTMLSbbDatepickerNextDayElement
    | HTMLSbbDatepickerToggleElement,
  trigger?: string | HTMLElement
): HTMLSbbDatepickerElement {
  if (!trigger) {
    const parent = hostContext('sbb-form-field', element);
    return parent?.querySelector('sbb-datepicker') as HTMLSbbDatepickerElement;
  }

  // Check whether it's a string or an HTMLElement
  if (typeof trigger === 'string') {
    return document.getElementById(trigger) as HTMLSbbDatepickerElement;
  } else if (trigger instanceof window.Element) {
    return trigger as HTMLSbbDatepickerElement;
  }
  return null;
}

/**
 * Given a SbbDatepicker component, returns the related input reference.
 */
export function getInput(
  element: HTMLSbbDatepickerElement,
  trigger?: string | HTMLElement
): HTMLInputElement {
  if (!trigger) {
    const parent = hostContext('sbb-form-field', element);
    return parent?.querySelector('input') as HTMLInputElement;
  }

  // Check whether it's a string or an HTMLElement
  if (typeof trigger === 'string') {
    return document.getElementById(trigger) as HTMLInputElement;
  } else if (trigger instanceof window.Element) {
    return trigger as HTMLInputElement;
  }
  return null;
}

export function getAvailableDate(
  date: Date,
  delta: number,
  datePicker: HTMLSbbDatepickerElement,
  dateAdapter: NativeDateAdapter
): Date {
  let availableDate = dateAdapter.addCalendarDays(date, delta);

  if (datePicker.dateFilter) {
    while (!datePicker.dateFilter(availableDate)) {
      availableDate = dateAdapter.addCalendarDays(availableDate, delta);
    }
  }

  return availableDate;
}

export function findPreviousAvailableDate(
  date: Date,
  datePicker: HTMLSbbDatepickerElement,
  dateAdapter: NativeDateAdapter,
  min: string | number
): Date {
  const previousDate = getAvailableDate(date, -1, datePicker, dateAdapter);
  const dateMin: Date = dateAdapter.deserializeDate(min);

  if (
    !dateMin ||
    (dateAdapter.isValid(dateMin) && dateAdapter.compareDate(previousDate, dateMin) >= 0)
  ) {
    return previousDate;
  }
  return date;
}

export function findNextAvailableDate(
  date: Date,
  datePicker: HTMLSbbDatepickerElement,
  dateAdapter: NativeDateAdapter,
  max: string | number
): Date {
  const nextDate = getAvailableDate(date, 1, datePicker, dateAdapter);
  const dateMax: Date = dateAdapter.deserializeDate(max);

  if (
    !dateMax ||
    (dateAdapter.isValid(dateMax) && dateAdapter.compareDate(nextDate, dateMax) <= 0)
  ) {
    return nextDate;
  }
  return date;
}

export function isDateAvailable(
  date: Date,
  datePicker: HTMLSbbDatepickerElement,
  min: string | number,
  max: string | number
): boolean {
  const dateAdapter = new NativeDateAdapter();
  const dateMin: Date = dateAdapter.deserializeDate(min);
  const dateMax: Date = dateAdapter.deserializeDate(max);

  if (!!dateMin && dateAdapter.isValid(dateMin) && dateAdapter.compareDate(date, dateMin) < 0) {
    return false;
  }
  if (!!dateMax && dateAdapter.isValid(dateMax) && dateAdapter.compareDate(date, dateMax) > 0) {
    return false;
  }

  return datePicker.dateFilter(date);
}

export interface InputUpdateEvent {
  disabled: boolean;
  readonly: boolean;
  min: string | number;
  max: string | number;
}
