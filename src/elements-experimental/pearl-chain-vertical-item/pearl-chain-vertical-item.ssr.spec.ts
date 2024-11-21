import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbPearlChainVerticalItemElement } from './pearl-chain-vertical-item.js';

describe(`sbb-pearl-chain-vertical-item ssr`, () => {
  let root: SbbPearlChainVerticalItemElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture<SbbPearlChainVerticalItemElement>(
      html`<sbb-pearl-chain-vertical-item></sbb-pearl-chain-vertical-item>`,
      { modules: ['./pearl-chain-vertical-item.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainVerticalItemElement);
  });
});
