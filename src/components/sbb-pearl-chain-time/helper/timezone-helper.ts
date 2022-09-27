import { isValid, parseISO } from 'date-fns';

export function removeTimezoneFromDate(date: string): Date {
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? new Date(date.substring(0, 19)) : undefined;
}
