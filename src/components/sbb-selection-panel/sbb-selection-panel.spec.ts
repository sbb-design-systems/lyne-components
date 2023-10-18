import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-selection-panel';

describe('sbb-selection-panel', () => {
  it('renders', async () => {
    // Note: for easier testing, we add the slot="badge"
    // to <sbb-card-badge> which would not be needed in real.
    const root = await fixture(
      html` <sbb-selection-panel>
        <sbb-card-badge slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
        <sbb-checkbox>Value one</sbb-checkbox>
        <span slot="subtext">Subtext</span>
        <span slot="suffix">Suffix</span>
        <div slot="content">Inner content</div>
      </sbb-selection-panel>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-selection-panel data-has-content data-state="closed">
        <sbb-card-badge slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
        <sbb-checkbox>Value one</sbb-checkbox>
        <span slot="subtext">Subtext</span>
        <span slot="suffix">Suffix</span>
        <div slot="content">Inner content</div>
      </sbb-selection-panel>`);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-selection-panel">
        <div class="sbb-selection-panel__badge">
          <slot name="badge"></slot>
        </div>
        <div class="sbb-selection-panel__input">
          <slot></slot>
        </div>
        <div class="sbb-selection-panel__content--wrapper" data-expanded="false" inert="">
          <div class="sbb-selection-panel__content">
            <sbb-divider></sbb-divider>
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `);
  });
});
