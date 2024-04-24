import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';

import type { SbbPearlChainVerticalElement } from './pearl-chain-vertical.js';

import './pearl-chain-vertical.js';

describe(`sbb-pearl-chain-vertical`, () => {
  it('renders', async () => {
    const element = await fixture<SbbPearlChainVerticalElement>(
      html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`,
    );
    await waitForLitRender(element);
    expect(element).dom.to.be.equal(`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`);
    expect(element).shadowDom.to.be.equal(`
      <div class="sbb-pearl-chain-vertical">
        <slot></slot>
      </div>
    `);
  });
});
