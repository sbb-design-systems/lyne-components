import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-header';

describe('sbb-header', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-header></sbb-header>`);

    expect(root).dom.to.be.equal(
      `
      <sbb-header></sbb-header>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
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
        `,
    );
  });

  it('renders actions and logo', async () => {
    const root = await fixture(html`
      <sbb-header>
        <sbb-header-action
          icon-name="hamburger-menu-small"
          href="https://github.com/lyne-design-system/lyne-components"
          text="Menu"
        ></sbb-header-action>
        <div slot="logo">
          <circle cx="25" cy="75" r="20"></circle>
        </div>
      </sbb-header>
    `);

    expect(root).dom.to.be.equal(
      `
      <sbb-header>
        <sbb-header-action icon-name="hamburger-menu-small" href="https://github.com/lyne-design-system/lyne-components" text="Menu"></sbb-header-action>
        <div slot="logo">
          <circle cx="25" cy="75" r="20"></circle>
        </div>
      </sbb-header>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
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
        `,
    );
  });
});
