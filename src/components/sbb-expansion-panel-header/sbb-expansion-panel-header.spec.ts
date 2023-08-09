import { SbbExpansionPanelHeader } from './sbb-expansion-panel-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-header', () => {
  it('renders collapsed', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: '<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-header slot='header' dir="ltr" role="button" slot="header" tabindex="0">
        <mock:shadow-root>
          <span class="sbb-expansion-panel-header">
            <span class="sbb-expansion-panel-header__title">
              <slot></slot>
            </span>
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon class="sbb-expansion-panel-header__toggle-icon" name="chevron-down-small"></sbb-icon>
            </span>
          </span>
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
      <sbb-expansion-panel-header slot='header' icon-name="pie-medium" dir="ltr" role="button" slot="header" tabindex="0" data-icon>
        <mock:shadow-root>
          <span class="sbb-expansion-panel-header">
            <span class="sbb-expansion-panel-header__title">
              <span class="sbb-expansion-panel-header__icon">
                <slot name="icon">
                  <sbb-icon name="pie-medium"></sbb-icon>
                </slot>
              </span>
              <slot></slot>
            </span>
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon class="sbb-expansion-panel-header__toggle-icon" name="chevron-down-small"></sbb-icon>
            </span>
          </span>
        </mock:shadow-root>
        Header
      </sbb-expansion-panel-header>
    `);
  });

  it('renders with slotted icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: `
        <sbb-expansion-panel-header>
          <sbb-icon slot='icon' name='pie-medium'></sbb-icon>
          Header
        </sbb-expansion-panel-header>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-header slot='header' dir="ltr" role="button" slot="header" tabindex="0" data-icon>
        <mock:shadow-root>
          <span class="sbb-expansion-panel-header">
            <span class="sbb-expansion-panel-header__title">
              <span class="sbb-expansion-panel-header__icon">
                <slot name="icon">
                </slot>
              </span>
              <slot></slot>
            </span>
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon class="sbb-expansion-panel-header__toggle-icon" name="chevron-down-small"></sbb-icon>
            </span>
          </span>
        </mock:shadow-root>
        <sbb-icon slot='icon' name='pie-medium'></sbb-icon>
        Header
      </sbb-expansion-panel-header>
    `);
  });
});
