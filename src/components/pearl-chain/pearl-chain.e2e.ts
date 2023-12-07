import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbPearlChainElement } from './pearl-chain';

describe('sbb-pearl-chain', () => {
  let element: SbbPearlChainElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`);
    assert.instanceOf(element, SbbPearlChainElement);
  });
});
