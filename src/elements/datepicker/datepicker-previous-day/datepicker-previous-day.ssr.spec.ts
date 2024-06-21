import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbDatepickerPreviousDayElement } from './datepicker-previous-day.js';

describe(`sbb-datepicker-previous-day ssr`, () => {
  let root: SbbDatepickerPreviousDayElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
      {
        modules: ['./datepicker-previous-day.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDatepickerPreviousDayElement);
  });
});
