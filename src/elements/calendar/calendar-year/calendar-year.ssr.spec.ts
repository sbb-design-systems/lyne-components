import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarYearElement } from './calendar-year.component.ts';

describe(`sbb-calendar-year ssr`, () => {
  let root: SbbCalendarYearElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-calendar-year .value=${'2025'}></sbb-calendar-year>`,
      {
        modules: ['./calendar-year.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarYearElement);
  });
});
