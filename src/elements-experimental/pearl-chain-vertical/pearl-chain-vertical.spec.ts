import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbPearlChainVerticalElement } from './pearl-chain-vertical.component.ts';

describe(`sbb-pearl-chain-vertical`, () => {
  let element: SbbPearlChainVerticalElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`);
    assert.instanceOf(element, SbbPearlChainVerticalElement);
  });
});
