import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbMiniCalendarElement } from './mini-calendar.component.ts';
import '../mini-calendar-month.ts';
import '../mini-calendar-day.ts';

describe(`sbb-mini-calendar ssr`, () => {
  let root: SbbMiniCalendarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-mini-calendar>
          <sbb-mini-calendar-month date="2025-01">
            <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
          </sbb-mini-calendar-month>
        </sbb-mini-calendar>
      `,
      {
        modules: [
          './mini-calendar.component.js',
          '../mini-calendar-month.js',
          '../mini-calendar-day.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMiniCalendarElement);
  });
});
