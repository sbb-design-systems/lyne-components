import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbMiniCalendarMonthElement } from './mini-calendar-month.component.ts';
import '../mini-calendar-day.ts';

describe(`sbb-mini-calendar-month ssr`, () => {
  let root: SbbMiniCalendarMonthElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-mini-calendar-month date="2025-01">
          <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
        </sbb-mini-calendar-month>
      `,
      {
        modules: ['./mini-calendar-month.component.js', '../mini-calendar-day.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMiniCalendarMonthElement);
  });
});
