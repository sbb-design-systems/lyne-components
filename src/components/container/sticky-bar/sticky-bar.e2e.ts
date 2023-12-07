import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbStickyBarElement } from './sticky-bar';

describe('sbb-sticky-bar', () => {
  let element: SbbStickyBarElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStickyBarElement);
  });
});
