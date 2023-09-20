import { SbbSelectionPanel } from './sbb-selection-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-selection-panel', () => {
  it('renders', async () => {
    // Note: for easier testing, we add the slot="badge"
    // to <sbb-card-badge> which would not be needed in real.
    const { root } = await newSpecPage({
      components: [SbbSelectionPanel],
      html: `
        <sbb-selection-panel>
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
    });

    expect(root).toEqualHtml(`
      <sbb-selection-panel data-has-content data-state="closed">
        <mock:shadow-root>
          <div class="sbb-selection-panel">
            <div class="sbb-selection-panel__badge">
              <slot name="badge"></slot>
            </div>
            <div class="sbb-selection-panel__input">
              <slot></slot>
            </div>
            <div class="sbb-selection-panel__content">
              <sbb-divider></sbb-divider>
              <slot name="content"></slot>
            </div>
          </div>
        </mock:shadow-root>

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
  });
});
