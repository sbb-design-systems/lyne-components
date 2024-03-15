import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './step-label';

describe('sbb-step-label', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-step-label></sbb-step-label>`);

    expect(root).dom.to.be.equal(`
        <sbb-step-label
            data-action
            data-button
            dir="ltr"
            id="sbb-step-label-0"
            role="tab"
            slot="step-label"
            tabindex="0"
        ></sbb-step-label>
    `);

    expect(root).shadowDom.to.be.equal(`
        <div class="sbb-step-label">
            <span class="sbb-step-label__prefix"><slot name="icon"></slot></span>
            <span class="sbb-step-label__text"><slot></slot></span>
        </div>
    `);
  });
});
