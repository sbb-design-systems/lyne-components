import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFooter } from './footer';

describe('sbb-footer', () => {
  let element: SbbFooter;

  it('renders', async () => {
    element = await fixture(html`<sbb-footer></sbb-footer>`);
    assert.instanceOf(element, SbbFooter);
  });
});
