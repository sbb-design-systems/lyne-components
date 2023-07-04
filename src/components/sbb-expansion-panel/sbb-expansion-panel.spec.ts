import { SbbExpansionPanel } from './sbb-expansion-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanel],
      html: '<sbb-expansion-panel />',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel>
        <mock:shadow-root>
          <div class="sbb-expansion-panel">
            <div class="sbb-expansion-panel__header">
              <slot name="header"></slot>
            </div>
            <span class="sbb-expansion-panel__content">
              <slot name="content"></slot>
            </span>
          </div>
        </mock:shadow-root>
      </sbb-expansion-panel>
    `);
  });

  it('renders with level set', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanel],
      html: '<sbb-expansion-panel level="4"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel level="4">
        <mock:shadow-root>
          <div class="sbb-expansion-panel">
            <h4 class="sbb-expansion-panel__header">
              <slot name="header"></slot>
            </h4>
            <span class="sbb-expansion-panel__content">
              <slot name="content"></slot>
            </span>
          </div>
        </mock:shadow-root>
      </sbb-expansion-panel>
    `);
  });
});
