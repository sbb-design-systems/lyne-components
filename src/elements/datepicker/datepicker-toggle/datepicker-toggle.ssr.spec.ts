import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbDatepickerToggleElement } from './datepicker-toggle.js';

describe(`sbb-datepicker-toggle ssr`, () => {
  let root: SbbDatepickerToggleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`, {
      modules: ['./datepicker-toggle.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDatepickerToggleElement);
  });
});
