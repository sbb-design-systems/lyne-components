import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import type { SbbMonthChangeEvent, SbbCalendarElement } from '../calendar/calendar.component.ts';

import './calendar-day.component.ts';

/**
 * Used in stories and tests to emulate the consumer's behavior;
 * dynamically removes the previous slotted days and adds the correct one based on the SbbMonthChangeEvent's Day[] range.
 * @param event The SbbMonthChangeEvent emitted from the SbbCalendarElement
 */
export const monthChangeHandler = (event: SbbMonthChangeEvent): void => {
  const calendar = event.target as SbbCalendarElement;
  Array.from(calendar.children).forEach((e) => e.remove());
  event.range?.map((day) => {
    const child = document.createElement('sbb-calendar-day');
    child.setAttribute('slot', day.value);
    calendar.appendChild(child);
  });
};

export const priceStyle = (greenBold: boolean): string => {
  return `display: flex; flex-direction: column; justify-content: center; ${greenBold ? 'color: var(--sbb-color-green); font-weight: bold;' : 'color: var(--sbb-color-metal);'}`;
};

export const createPrice = (greenBold: boolean): TemplateResult => {
  return html`
    <span class="sbb-text-xxs" style=${priceStyle(greenBold)}>${greenBold ? '99.-' : '123.-'}</span>
  `;
};

/**
 * Used in stories and tests to emulate the consumer's behavior;
 * dynamically slots the correct days based on the initial year and month.
 * @param {number} year - The year used to calculate the number of days.
 * @param {number} month - The month used to calculate the number of days.
 * @param {boolean} withPrice - If the extra content is present.
 */
export const createSlottedDays = (
  year: number,
  month: number,
  withPrice: boolean = false,
): TemplateResult => {
  const daysInMonth = defaultDateAdapter.getNumDaysInMonth(
    defaultDateAdapter.createDate(year, month, 1),
  );
  return html`${repeat(new Array(daysInMonth), (_, index) => {
    const slotName = defaultDateAdapter.toIso8601(new Date(`${year}-${month}-${index + 1}`));
    return html`<sbb-calendar-day slot=${slotName}>
      ${withPrice ? createPrice((index + 1) % 9 === 0) : nothing}
    </sbb-calendar-day>`;
  })}`;
};
