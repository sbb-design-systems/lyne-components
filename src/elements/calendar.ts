/** @entrypoint */
import {
  SbbCalendarDayElement,
  SbbCalendarElement,
  SbbCalendarMonthElement,
  SbbCalendarWeekdayElement,
  SbbCalendarWeeknumberElement,
  SbbCalendarYearElement,
} from './calendar.pure.ts';

export * from './calendar.pure.ts';

SbbCalendarElement.define();
SbbCalendarDayElement.define();
SbbCalendarMonthElement.define();
SbbCalendarYearElement.define();
SbbCalendarWeekdayElement.define();
SbbCalendarWeeknumberElement.define();
