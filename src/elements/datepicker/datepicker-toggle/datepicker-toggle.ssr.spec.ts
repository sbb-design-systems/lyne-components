import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDatepickerToggleElement } from './datepicker-toggle.component.ts';

describe(`sbb-datepicker-toggle ssr`, () => {
  let root: SbbDatepickerToggleElement;

  beforeEach(async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);
    root = await ssrHydratedFixture(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`, {
      modules: ['./datepicker-toggle.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDatepickerToggleElement);
  });
});
