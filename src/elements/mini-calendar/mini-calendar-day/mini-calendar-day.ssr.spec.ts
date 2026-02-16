import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbMiniCalendarDayElement } from './mini-calendar-day.component.ts';

describe(`sbb-mini-calendar-day ssr`, () => {
  let root: SbbMiniCalendarDayElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>`,
      {
        modules: ['./mini-calendar-day.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMiniCalendarDayElement);
  });
});
