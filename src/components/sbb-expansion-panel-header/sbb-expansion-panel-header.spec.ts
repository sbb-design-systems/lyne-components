import { SbbExpansionPanelHeader } from './sbb-expansion-panel-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-header', () => {
  it('renders collapsed', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: '<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-header slot='header'>
        <mock:shadow-root>
          <button class="sbb-expansion-panel-header" type="button">
            <span class="sbb-expansion-panel-header__title">
              <span class="sbb-expansion-panel-header__label">
                <slot></slot>
              </span>
            </span>
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon name="chevron-down-small"></sbb-icon>
            </span>
          </button>
        </mock:shadow-root>
        Header
      </sbb-expansion-panel-header>
    `);
  });

  it('renders with icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: '<sbb-expansion-panel-header icon-name="pie-medium">Header</sbb-expansion-panel-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-header slot='header' icon-name="pie-medium">
        <mock:shadow-root>
          <button class="sbb-expansion-panel-header" type="button">
            <span class="sbb-expansion-panel-header__title">
              <span class="sbb-expansion-panel-header__icon">
                <slot name="icon">
                  <sbb-icon name="pie-medium"></sbb-icon>
                </slot>
              </span>
              <span class="sbb-expansion-panel-header__label">
                <slot></slot>
              </span>
            </span>
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon name="chevron-down-small"></sbb-icon>
            </span>
          </button>
        </mock:shadow-root>
        Header
      </sbb-expansion-panel-header>
    `);
  });
});
