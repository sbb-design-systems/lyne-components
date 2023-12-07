import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTabTitleElement } from './tab-title';

describe('sbb-tab-title', () => {
  let element: SbbTabTitleElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-tab-title></sbb-tab-title>`);
    assert.instanceOf(element, SbbTabTitleElement);
  });
});
