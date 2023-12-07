import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbPearlChainVerticalElement } from './pearl-chain-vertical';

describe('sbb-pearl-chain', () => {
  let element: SbbPearlChainVerticalElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`);
    assert.instanceOf(element, SbbPearlChainVerticalElement);
  });
});
