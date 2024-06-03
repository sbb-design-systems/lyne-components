import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';

import { SbbDatepickerElement } from './datepicker.js';

describe(`sbb-datepicker ${fixture.name}`, () => {
  let root: SbbDatepickerElement;

  beforeEach(async () => {
    root = await fixture(html`<sbb-datepicker></sbb-datepicker>`, {
      modules: ['./datepicker.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDatepickerElement);
  });
});
