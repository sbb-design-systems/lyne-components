/** @entrypoint */
import { SbbCalendarDayElement } from './calendar-day/calendar-day.component.ts';

export * from './calendar-day/calendar-day.component.ts';

SbbCalendarDayElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar-day.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
