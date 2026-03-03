/** @entrypoint */
import { SbbMiniCalendarElement } from './mini-calendar/mini-calendar.component.ts';

export * from './mini-calendar/mini-calendar.component.ts';

SbbMiniCalendarElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/mini-calendar/mini-calendar.js' has been deprecated.
Use either '@sbb-esta/elements/mini-calendar.js' or '@sbb-esta/elements/mini-calendar.pure.js' instead.`);
