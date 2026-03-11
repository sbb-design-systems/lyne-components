/** @entrypoint */
import { SbbMiniCalendarMonthElement } from './mini-calendar-month/mini-calendar-month.component.ts';

export * from './mini-calendar-month/mini-calendar-month.component.ts';

SbbMiniCalendarMonthElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/mini-calendar/mini-calendar-month.js' has been deprecated.
Use either '@sbb-esta/elements/mini-calendar.js' or '@sbb-esta/elements/mini-calendar.pure.js' instead.`);
