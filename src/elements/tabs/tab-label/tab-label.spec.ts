import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTabLabelElement } from './tab-label.js';

describe(`sbb-tab-label`, () => {
  let element: SbbTabLabelElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-tab-label></sbb-tab-label>`);
    assert.instanceOf(element, SbbTabLabelElement);
  });
});
