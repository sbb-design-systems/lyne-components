import { SbbExpansionPanelHeader } from './sbb-expansion-panel-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-header', () => {
  it('renders collapsed', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: '<sbb-expansion-panel-header />',
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
      </sbb-expansion-panel-header>
    `);
  });

  it('renders expanded', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: '<sbb-expansion-panel-header expanded/>',
    });

    expect(root).toEqualHtml(`
      <sbb-expansion-panel-header slot='header' expanded>
        <mock:shadow-root>
          <button aria-expanded class="sbb-expansion-panel-header" type="button">
            <span class="sbb-expansion-panel-header__title">
              <span class="sbb-expansion-panel-header__label">
                <slot></slot>
              </span>
            </span>
            <span class="sbb-expansion-panel-header__toggle">
              <sbb-icon name="chevron-up-small"></sbb-icon>
            </span>
          </button>
        </mock:shadow-root>
      </sbb-expansion-panel-header>
    `);
  });
});
