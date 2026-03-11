/** @entrypoint */
import { SbbCalendarControlsElement } from './calendar-controls/calendar-controls.component.ts';

export * from './calendar-controls/calendar-controls.component.ts';

SbbCalendarControlsElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/calendar/calendar-controls.js' has been deprecated.
Use either '@sbb-esta/elements/calendar.js' or '@sbb-esta/elements/calendar.pure.js' instead.`);
