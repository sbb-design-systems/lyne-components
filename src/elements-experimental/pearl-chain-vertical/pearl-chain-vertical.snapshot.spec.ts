import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbPearlChainVerticalElement } from './pearl-chain-vertical.component.ts';

import './pearl-chain-vertical.component.ts';

describe(`sbb-pearl-chain-vertical`, () => {
  describe('renders', () => {
    let element: SbbPearlChainVerticalElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalElement>(
        html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
