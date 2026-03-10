/** @entrypoint */
import { SbbMiniCalendarDayElement } from './mini-calendar-day/mini-calendar-day.component.ts';

export * from './mini-calendar-day/mini-calendar-day.component.ts';

SbbMiniCalendarDayElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/mini-calendar/mini-calendar-day.js' has been deprecated.
Use either '@sbb-esta/elements/mini-calendar.js' or '@sbb-esta/elements/mini-calendar.pure.js' instead.`);
