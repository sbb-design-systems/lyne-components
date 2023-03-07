import { SbbSelectionPanel } from './sbb-selection-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-selection-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelectionPanel],
      html: '<sbb-selection-panel />',
    });

    expect(root).toEqualHtml(`
        <sbb-selection-panel>
          <mock:shadow-root>
            <div class="sbb-selection-panel">
              <div class="sbb-selection-panel__badge">
                <slot name="badge"></slot>
              </div>
              <div class="sbb-selection-panel__input">
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-selection-panel>
      `);
  });
});
