import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbPearlChainElement } from './pearl-chain.component.ts';
import '../../pearl-chain.ts';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`);
  });

  it('DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('Shadow DOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
