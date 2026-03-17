/** @entrypoint */
import { SbbCalendarMonthElement } from './calendar-month/calendar-month.component.ts';

export * from './calendar-month/calendar-month.component.ts';

SbbCalendarMonthElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar-month.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
