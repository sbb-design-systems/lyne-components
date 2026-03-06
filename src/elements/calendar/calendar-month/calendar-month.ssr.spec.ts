import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarMonthElement } from './calendar-month.component.ts';

describe(`sbb-calendar-month ssr`, () => {
  let root: SbbCalendarMonthElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-calendar-month .value=${'2025-01'}></sbb-calendar-month>`,
      {
        modules: ['./calendar-month.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarMonthElement);
  });
});
