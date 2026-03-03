/** @entrypoint */
import { SbbCalendarElement } from './calendar/calendar.component.ts';

export * from './calendar/calendar.component.ts';

SbbCalendarElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
