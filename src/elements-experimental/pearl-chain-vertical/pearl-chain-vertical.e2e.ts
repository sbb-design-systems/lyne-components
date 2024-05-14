import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-components/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbPearlChainVerticalElement } from './pearl-chain-vertical.js';

describe(`sbb-pearl-chain with ${fixture.name}`, () => {
  let element: SbbPearlChainVerticalElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`, {
      modules: ['./pearl-chain-vertical.ts'],
    });
    assert.instanceOf(element, SbbPearlChainVerticalElement);
  });
});
