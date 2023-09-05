import { SbbExpansionPanelContent } from './sbb-expansion-panel-content';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-content', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelContent],
      html: '<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-content slot="content" role="region">
        <mock:shadow-root>
          <div class="sbb-expansion-panel-content">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </sbb-expansion-panel-content>
    `);
  });

  it('renders expanded', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelContent],
      html: '<sbb-expansion-panel-content expanded>Content</sbb-expansion-panel-content>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-content slot="content" role="region" expanded>
        <mock:shadow-root>
          <div class="sbb-expansion-panel-content">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </sbb-expansion-panel-content>
    `);
  });
});
