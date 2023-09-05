import { SbbExpansionPanel } from './sbb-expansion-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanel],
      html: `
        <sbb-expansion-panel>
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel style="--sbb-expansion-panel-content-height: auto;">
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
        <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);
  });

  it('renders with level set', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanel],
      html: `
        <sbb-expansion-panel title-level="4">
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel title-level="4" style="--sbb-expansion-panel-content-height: auto;">
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
        <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);
  });
});
