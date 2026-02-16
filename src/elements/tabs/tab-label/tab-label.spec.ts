import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTabLabelElement } from './tab-label.component.ts';

describe(`sbb-tab-label`, () => {
  let element: SbbTabLabelElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-tab-label>Label</sbb-tab-label>`);
    assert.instanceOf(element, SbbTabLabelElement);
  });
});
