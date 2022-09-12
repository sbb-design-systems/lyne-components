import { isValid, parseISO } from 'date-fns';

export function removeTimezoneFromDate(date: string): Date {
  if (isValid(parseISO(date))) return new Date(date.substring(0, 19));
}
