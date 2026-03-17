/** @entrypoint */
import { SbbCalendarWeekdayElement } from './calendar-weekday/calendar-weekday.component.ts';

export * from './calendar-weekday/calendar-weekday.component.ts';

SbbCalendarWeekdayElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar-weekday.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
