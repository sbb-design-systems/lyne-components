import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarDayElement } from './calendar-day.component.ts';

describe(`sbb-calendar-day ssr`, () => {
  let root: SbbCalendarDayElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-calendar-day slot="2025-01-01"></sbb-calendar-day>`, {
      modules: ['./calendar-day.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarDayElement);
  });
});
