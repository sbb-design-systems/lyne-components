import { SbbHeader } from './sbb-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeader],
      html: '<sbb-header />',
    });

    expect(root).toEqualHtml(`
      <sbb-header>
        <mock:shadow-root>
          <header class="sbb-header">
            <div class="sbb-header__wrapper">
              <slot></slot>
              <div class="sbb-header__logo">
                <slot name="logo">
                  <sbb-logo protective-room="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </header>
        </mock:shadow-root>
      </sbb-header>
    `);
  });

  it('renders actions and logo', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeader],
      html: `
        <sbb-header>
          <sbb-header-action
            icon-name="hamburger-menu-small"
            href="https://github.com/lyne-design-system/lyne-components"
            text="Menu"/>
          <div slot="logo">
            <circle cx="25" cy="75" r="20"/>
          </div>
        </sbb-header>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-header>
        <mock:shadow-root>
          <header class="sbb-header">
            <div class="sbb-header__wrapper">
              <slot></slot>
              <div class="sbb-header__logo">
                <slot name="logo">
                  <sbb-logo protective-room="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </header>
        </mock:shadow-root>
        <sbb-header-action icon-name="hamburger-menu-small" href="https://github.com/lyne-design-system/lyne-components" text="Menu"/>
        <div slot="logo">
          <circle cx="25" cy="75" r="20"></circle>
        </div>
      </sbb-header>
    `);
  });
});
