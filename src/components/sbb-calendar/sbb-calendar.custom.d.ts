export interface Day {
  value: string;
  dayValue: string;
  monthValue: string;
  yearValue: string;
}

export interface Month {
  value: string;
  longValue: string;
  monthValue: number;
}

export interface Weekday {
  long: string;
  narrow: string;
}

export type CalendarView = 'day' | 'month' | 'year';
