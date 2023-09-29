import { SbbPearlChainVertical } from './sbb-pearl-chain-vertical';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
  it('renders', async () => {
    const element = await fixture<SbbPearlChainVertical>(
      html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`,
    );
    await element.updateComplete;
    expect(element).dom.to.be.equal(`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`);
    expect(element).shadowDom.to.be.equal(`
      <div class="sbb-pearl-chain-vertical">
        <slot></slot>
      </div>
    `);
  });
});
