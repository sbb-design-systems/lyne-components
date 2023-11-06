import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbPearlChain } from './pearl-chain';

describe('sbb-pearl-chain', () => {
  let element: SbbPearlChain;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`);
    assert.instanceOf(element, SbbPearlChain);
  });
});
