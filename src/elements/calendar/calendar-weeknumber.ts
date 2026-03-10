/** @entrypoint */
import { SbbCalendarWeeknumberElement } from './calendar-weeknumber/calendar-weeknumber.component.ts';

export * from './calendar-weeknumber/calendar-weeknumber.component.ts';

SbbCalendarWeeknumberElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar-weeknumber.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
