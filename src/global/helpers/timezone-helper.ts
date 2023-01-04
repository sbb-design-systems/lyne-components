import { isValid, parseISO } from 'date-fns';

/**
 * This function removes the offset of a ISO date string. This needs to be done to make sure that the offset is ignored.
 * If it is not removed the time would be converted to the browsers local time.
 * Example: "2022-08-29T09:30:00+03:00" would be changed to "2022-08-29T08:30:00+02:00" --> not the desired outcome, as we want to use the time in the timezone and not the local time.
 *
 * After the offset is removed a new date is created in the browsers local time. This ensures that the time of the ISO date string is displayed and not a converted time.
 * Example: "2022-08-29T09:30:00+03:00" would be changed to "2022-08-29T09:30:00+02:00" --> desired outcome
 * Attention: This function does not convert the time to the correct time in the local timezone. It is a workaround to make sure, that the given time is displayed without being converted.
 *
 * Offset: Difference between the timezone and Coordinated Universal Time.
 *
 * @param isoTime - the iso time with the timezone offset
 * @returns a new date with the local timezone with the local offset
 */
export function removeTimezoneFromISOTimeString(isoTime: string): Date | undefined {
  const parsedDate = parseISO(isoTime);

  if (!isValid(parsedDate)) {
    return undefined;
  }

  if (isoTime.includes('Z')) {
    return new Date(isoTime.replace('Z', ''));
  }

  if (isoTime.includes('T')) {
    const dateTime = isoTime.split('T');

    if (dateTime[1] && (dateTime[1].includes('+') || dateTime[1].includes('-'))) {
      return new Date(`${dateTime[0]}T${dateTime[1].split(/[+-]/)[0]}`);
    }
  }
  return new Date(isoTime);
}
