import { hostContext } from '../../global/helpers/host-context';

/**
 * Given a SbbDatepickerPreviousDay or a SbbDatepickerNextDay component, returns the related SbbDatepicker reference.
 */
export function getDatePicker(
  element: HTMLSbbDatepickerPreviousDayElement | HTMLSbbDatepickerNextDayElement,
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
