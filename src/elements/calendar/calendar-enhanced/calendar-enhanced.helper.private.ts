import { html, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';

import '../calendar-day/calendar-day.component.ts';
import type {
  SbbCalendarEnhancedElement,
  SbbMonthChangeEvent,
} from './calendar-enhanced.component.ts';

/**
 * Used in stories and tests to emulate the consumer's behavior;
 * dynamically removes the previous slotted days and adds the correct one based on the SbbMonthChangeEvent's Day[] range.
 * @param event The SbbMonthChangeEvent emitted from the SbbCalendarEnhancedElement
 */
export const monthChangeHandler = (event: SbbMonthChangeEvent): void => {
  const calendar = event.target as SbbCalendarEnhancedElement;
  Array.from(calendar.children).forEach((e) => e.remove());
  event.range?.map((day) => {
    const child = document.createElement('sbb-calendar-day');
    child.setAttribute('slot', day.value);
    calendar.appendChild(child);
  });
};

/**
 * Used in stories and tests to emulate the consumer's behavior;
 * dynamically slots the correct days based on the initial year and month.
 * @param {number} year - The year used to calculate the number of days.
 * @param {number} month - The month used to calculate the number of days.
 */
export const createSlottedDays = (year: number, month: number): TemplateResult => {
  const daysInMonth = defaultDateAdapter.getNumDaysInMonth(
    defaultDateAdapter.createDate(year, month, 1),
  );
  return html`${repeat(new Array(daysInMonth), (_, index) => {
    const slotName = defaultDateAdapter.toIso8601(new Date(`${year}-${month}-${index + 1}`));
    return html`<sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
  })}`;
};
