/** @entrypoint */
import { SbbCalendarYearElement } from './calendar-year/calendar-year.component.ts';

export * from './calendar-year/calendar-year.component.ts';

SbbCalendarYearElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar-year.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
