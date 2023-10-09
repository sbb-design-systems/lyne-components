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
      <sbb-expansion-panel>
        <mock:shadow-root>
          <div class="sbb-expansion-panel">
            <div class="sbb-expansion-panel__header">
              <slot name="header"></slot>
            </div>
            <div class="sbb-expansion-panel__content-wrapper">
              <span class="sbb-expansion-panel__content">
                <slot name="content"></slot>
              </span>
            </div>
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
      <sbb-expansion-panel title-level="4">
        <mock:shadow-root>
          <div class="sbb-expansion-panel">
            <h4 class="sbb-expansion-panel__header">
              <slot name="header"></slot>
            </h4>
            <div class="sbb-expansion-panel__content-wrapper">
              <span class="sbb-expansion-panel__content">
                <slot name="content"></slot>
              </span>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);
  });
});
