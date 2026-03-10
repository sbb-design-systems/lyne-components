import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import type { Weekday } from '../calendar/calendar.component.ts';

import { SbbCalendarWeekdayElement } from './calendar-weekday.component.ts';

describe('sbb-calendar-weekday', () => {
  let element: SbbCalendarWeekdayElement;

  beforeEach(async () => {
    const weekDay: Weekday = { long: 'Monday', narrow: 'M' };
    element = await fixture(html`<sbb-calendar-weekday .value=${weekDay}></sbb-calendar-weekday>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendarWeekdayElement);
  });
});
