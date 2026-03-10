import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';
import type { Weekday } from '../calendar/calendar.component.ts';

import { SbbCalendarWeekdayElement } from './calendar-weekday.component.ts';

describe(`sbb-calendar-weekday ssr`, () => {
  let root: SbbCalendarWeekdayElement;

  beforeEach(async () => {
    const weekDay: Weekday = { long: 'Monday', narrow: 'M' };
    root = await ssrHydratedFixture(
      html`<sbb-calendar-weekday .value=${weekDay}></sbb-calendar-weekday>`,
      {
        modules: ['./calendar-weekday.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarWeekdayElement);
  });
});
