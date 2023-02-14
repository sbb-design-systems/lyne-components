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

export function findNextAvailableDate(
  date: Date,
  increment: number,
  datePicker: HTMLSbbDatepickerElement
): Date {
  const dateAdapter = new NativeDateAdapter();
  const min: Date = dateAdapter.deserializeDate(datePicker.min);
  const max: Date = dateAdapter.deserializeDate(datePicker.max);
  let newDate = dateAdapter.addCalendarDays(date, increment);
  while (!datePicker.dateFilter(newDate)) {
    newDate = dateAdapter.addCalendarDays(newDate, increment);
  }

  if (
    (!dateAdapter.isValid(min) || dateAdapter.compareDate(min, newDate) <= 0) &&
    (!dateAdapter.isValid(max) || dateAdapter.compareDate(max, newDate) >= 0)
  ) {
    return newDate;
  }

  return date;
}
