import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import type { SbbPearlChainVertical } from './pearl-chain-vertical';

import './pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
  it('renders', async () => {
    const element = await fixture<SbbPearlChainVertical>(
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
