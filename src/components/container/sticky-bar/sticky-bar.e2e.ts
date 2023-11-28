import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbStickyBar } from './sticky-bar';

describe('sbb-sticky-bar', () => {
  let element: SbbStickyBar;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStickyBar);
  });
});
