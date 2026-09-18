import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import type { SbbPearlChainNodeElement } from './pearl-chain-node.component.ts';
import '../../pearl-chain.ts';

describe(`sbb-pearl-chain-node`, () => {
  describe('renders', () => {
    let element: SbbPearlChainNodeElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
