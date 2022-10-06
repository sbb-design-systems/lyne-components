import { isValid, parseISO } from 'date-fns';

// remove if timetable-row is merged

/** This function removes the offset of a ISO date string. This needs to be done to make sure that the offset is ignored and not added to the time.
 * If it is not removed the time would be displayed in the browsers local time.
 *
 * Example: "2022-08-29T09:30:00+03:00" would be changed to "2022-08-29T08:30:00+02:00" --> not the desired outcome
 *
 * After the offset is removed a new date is created in the browsers local time. This ensures that the time of the ISO date string is displayed and not a converted time.
 *
 * Example: "2022-08-29T09:30:00+03:00" would be changed to "2022-08-29T09:30:00+02:00" --> desired outcome
 *
 * Offset: Difference between the timzone and Coordinated Universal Time.
 */

export function removeTimezoneFromDate(date: string): Date {
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? new Date(date.substring(0, 19)) : undefined;
}
