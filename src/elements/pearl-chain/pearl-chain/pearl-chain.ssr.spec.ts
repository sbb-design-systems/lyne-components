import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbPearlChainElement } from './pearl-chain.component.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain ssr`, () => {
  let root: SbbPearlChainElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-pearl-chain></sbb-pearl-chain>`, {
      modules: ['../../pearl-chain.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainElement);
  });
});
