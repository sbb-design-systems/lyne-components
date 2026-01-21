import { html, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import '../calendar-day/calendar-day.component.ts';

export const createSlottedDays = (year: number, month: number): TemplateResult => {
  const daysInMonth = defaultDateAdapter.getNumDaysInMonth(
    defaultDateAdapter.createDate(year, month, 1),
  );
  return html`${repeat(new Array(daysInMonth), (_, index) => {
    const slotName = defaultDateAdapter.toIso8601(new Date(`${year}-${month}-${index + 1}`));
    return html` <sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
  })}`;
};
