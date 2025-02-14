import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbPearlChainVerticalItemElement } from './pearl-chain-vertical-item.js';

describe(`sbb-pearl-chain-vertical-item`, () => {
  let element: SbbPearlChainVerticalItemElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain-vertical-item></sbb-pearl-chain-vertical-item>`);
    assert.instanceOf(element, SbbPearlChainVerticalItemElement);
  });
});
