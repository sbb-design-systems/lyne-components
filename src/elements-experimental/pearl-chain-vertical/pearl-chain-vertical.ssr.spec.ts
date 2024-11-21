import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbPearlChainVerticalElement } from './pearl-chain-vertical.js';

describe(`sbb-pearl-chain-vertical ssr`, () => {
  let root: SbbPearlChainVerticalElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`, {
      modules: ['./pearl-chain-vertical.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainVerticalElement);
  });
});
