import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';
import '../calendar-day/calendar-day.component.ts';
import { createSlottedDays } from './calendar-enhanced.helper.ts';

describe(`sbb-calendar-enhanced ssr`, () => {
  let root: SbbCalendarEnhancedElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-calendar-enhanced> ${createSlottedDays(2025, 1)} </sbb-calendar-enhanced> `,
      {
        modules: ['./calendar-enhanced.component.js', '../calendar-day/calendar-day.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarEnhancedElement);
  });

  it('renders shadow DOM', () => {
    assert.instanceOf(root.shadowRoot?.querySelector('.sbb-calendar__controls'), HTMLDivElement);
  });
});
