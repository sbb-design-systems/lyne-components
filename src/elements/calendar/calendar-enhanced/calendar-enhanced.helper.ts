import { html, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';

import '../calendar-day/calendar-day.component.ts';
import type {
  SbbCalendarEnhancedElement,
  SbbMonthChangeEvent,
} from './calendar-enhanced.component.ts';

export const monthChangedHandler = (e: SbbMonthChangeEvent): void => {
  const calendar = e.target as SbbCalendarEnhancedElement;
  Array.from(calendar.children).forEach((e) => calendar.removeChild(e));
  e.range?.map((day) => {
    const child = document.createElement('sbb-calendar-day');
    child.setAttribute('slot', day.value);
    calendar.appendChild(child);
  });
};

export const createSlottedDays = (year: number, month: number): TemplateResult => {
  const daysInMonth = defaultDateAdapter.getNumDaysInMonth(
    defaultDateAdapter.createDate(year, month, 1),
  );
  return html`${repeat(new Array(daysInMonth), (_, index) => {
    const slotName = defaultDateAdapter.toIso8601(new Date(`${year}-${month}-${index + 1}`));
    return html` <sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
  })}`;
};
