import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbPearlChainVerticalItemElement } from './pearl-chain-vertical-item.component.ts';

describe(`sbb-pearl-chain-vertical-item ssr`, () => {
  let root: SbbPearlChainVerticalItemElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture<SbbPearlChainVerticalItemElement>(
      html`<sbb-pearl-chain-vertical-item></sbb-pearl-chain-vertical-item>`,
      { modules: ['./pearl-chain-vertical-item.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainVerticalItemElement);
  });
});
