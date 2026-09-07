import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbPearlChainNodeElement } from './pearl-chain-node.component.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain-node ssr`, () => {
  let root: SbbPearlChainNodeElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>`,
      {
        modules: ['../../pearl-chain.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainNodeElement);
  });
});
