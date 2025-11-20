import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDatepickerNextDayElement } from './datepicker-next-day.component.ts';

describe(`sbb-datepicker-next-day ssr`, () => {
  let root: SbbDatepickerNextDayElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`, {
      modules: ['./datepicker-next-day.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDatepickerNextDayElement);
  });
});
