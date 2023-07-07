import { SbbAccordion } from './sbb-accordion';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-accordion', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbAccordion],
      html: `
        <sbb-accordion>
          <sbb-expansion-panel>
            <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
          </sbb-expansion-panel>
          <sbb-expansion-panel>
            <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
          </sbb-expansion-panel>
        </sbb-accordion>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-accordion>
          <mock:shadow-root>
            <div class="sbb-accordion">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <sbb-expansion-panel>
            <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
          </sbb-expansion-panel>
          <sbb-expansion-panel>
            <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
          </sbb-expansion-panel>
        </sbb-accordion>
      `);
  });
});
