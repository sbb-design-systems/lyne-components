import { SbbSelectionPanel } from './sbb-selection-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-selection-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelectionPanel],
      html: `
        <sbb-selection-panel>
          <sbb-card-badge slot="badge">
            <div slot="generic">
              <span>%</span>
            </div>
          </sbb-card-badge>
          
          <sbb-checkbox>Value one</sbb-checkbox>

          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
          
          <div slot="content">Inner content</div> 
        </sbb-selection-panel>`,
    });

    expect(root).toEqualHtml(`
      <sbb-selection-panel data-has-content>
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
          <div slot="generic">
            <span>
              %
            </span>
          </div>
        </sbb-card-badge>
        
        <sbb-checkbox>Value one</sbb-checkbox>

        <span slot="subtext">Subtext</span>
        <span slot="suffix">Suffix</span>

        <div slot="content">Inner content</div>
      </sbb-selection-panel>`);
  });
});
