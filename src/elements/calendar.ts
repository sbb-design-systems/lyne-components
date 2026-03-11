/** @entrypoint */
import {
  SbbCalendarElement,
  SbbCalendarDayElement,
  SbbCalendarMonthElement,
  SbbCalendarYearElement,
  SbbCalendarWeekdayElement,
  SbbCalendarWeeknumberElement,
  SbbCalendarControlsElement,
} from './calendar.pure.ts';

export * from './calendar.pure.ts';

SbbCalendarElement.define();
SbbCalendarControlsElement.define();
SbbCalendarDayElement.define();
SbbCalendarMonthElement.define();
SbbCalendarYearElement.define();
SbbCalendarWeekdayElement.define();
SbbCalendarWeeknumberElement.define();
