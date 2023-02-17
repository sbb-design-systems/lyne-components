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
  dateAdapter: NativeDateAdapter
): Date {
  const previousDate = getAvailableDate(date, -1, datePicker, dateAdapter);
  const min: Date = dateAdapter.deserializeDate(datePicker.min);

  if (!min || (dateAdapter.isValid(min) && dateAdapter.compareDate(previousDate, min) >= 0)) {
    return previousDate;
  }
  return date;
}

export function findNextAvailableDate(
  date: Date,
  datePicker: HTMLSbbDatepickerElement,
  dateAdapter: NativeDateAdapter
): Date {
  const nextDate = getAvailableDate(date, 1, datePicker, dateAdapter);
  const max: Date = dateAdapter.deserializeDate(datePicker.max);

  if (!max || (dateAdapter.isValid(max) && dateAdapter.compareDate(nextDate, max) <= 0)) {
    return nextDate;
  }
  return date;
}

export function isDateAvailable(date: Date, datePicker: HTMLSbbDatepickerElement): boolean {
  const dateAdapter = new NativeDateAdapter();
  const min: Date = dateAdapter.deserializeDate(datePicker.min);
  const max: Date = dateAdapter.deserializeDate(datePicker.max);

  if (!!min && dateAdapter.isValid(min) && dateAdapter.compareDate(date, min) < 0) {
    return false;
  }
  if (!!max && dateAdapter.isValid(max) && dateAdapter.compareDate(date, max) > 0) {
    return false;
  }

  return datePicker.dateFilter(date);
}
