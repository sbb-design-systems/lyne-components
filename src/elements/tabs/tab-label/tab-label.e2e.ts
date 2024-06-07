import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTabLabelElement } from './tab-label.js';

describe(`sbb-tab-label with ${fixture.name}`, () => {
  let element: SbbTabLabelElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-tab-label></sbb-tab-label>`, { modules: ['./tab-label.ts'] });
    assert.instanceOf(element, SbbTabLabelElement);
  });
});
