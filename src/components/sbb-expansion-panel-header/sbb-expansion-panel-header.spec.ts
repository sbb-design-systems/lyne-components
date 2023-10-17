import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-expansion-panel-header';

describe('sbb-expansion-panel-header', () => {
  it('renders collapsed', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-header slot='header' dir="ltr" role="button" slot="header" tabindex="0">
          Header
        </sbb-expansion-panel-header>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-expansion-panel-header">
          <span class="sbb-expansion-panel-header__title">
            <slot></slot>
          </span>
          <span class="sbb-expansion-panel-header__toggle">
            <sbb-icon 
            aria-hidden="true" 
            data-namespace="default" 
            role="img" 
            class="sbb-expansion-panel-header__toggle-icon" 
            name="chevron-small-down-medium"></sbb-icon>
          </span>
        </span>
      `,
    );
  });

  it('renders with icon', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-header icon-name="pie-medium">Header</sbb-expansion-panel-header>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-header 
          slot='header' 
          icon-name="pie-medium" 
          dir="ltr" 
          role="button" 
          slot="header" 
          tabindex="0" 
          data-icon
        >
          Header
        </sbb-expansion-panel-header>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-expansion-panel-header">
          <span class="sbb-expansion-panel-header__title">
            <span class="sbb-expansion-panel-header__icon">
              <slot name="icon">
                <sbb-icon
                  aria-hidden="true"
                  data-namespace="default"
                  name="pie-medium"
                  role="img"
                ></sbb-icon>
              </slot>
            </span>
            <slot></slot>
          </span>
          <span class="sbb-expansion-panel-header__toggle">
            <sbb-icon 
            aria-hidden="true" 
            data-namespace="default" 
            role="img" 
            class="sbb-expansion-panel-header__toggle-icon" 
            name="chevron-small-down-medium"></sbb-icon>
          </span>
        </span>
      `,
    );
  });

  it('renders with slotted icon', async () => {
    const root = await fixture(html`
      <sbb-expansion-panel-header>
        <sbb-icon slot="icon" name="pie-medium"></sbb-icon>
        Header
      </sbb-expansion-panel-header>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-header slot='header' dir="ltr" role="button" slot="header" tabindex="0" data-icon>
          <sbb-icon 
            aria-hidden="true" 
            data-namespace="default" 
            role="img" 
            slot='icon' 
            name='pie-medium'></sbb-icon>
          Header
        </sbb-expansion-panel-header>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-expansion-panel-header">
          <span class="sbb-expansion-panel-header__title">
            <span class="sbb-expansion-panel-header__icon">
              <slot name="icon">
              </slot>
            </span>
            <slot></slot>
          </span>
          <span class="sbb-expansion-panel-header__toggle">
            <sbb-icon 
              aria-hidden="true" 
              data-namespace="default" 
              role="img" 
              class="sbb-expansion-panel-header__toggle-icon" 
              name="chevron-small-down-medium"></sbb-icon>
          </span>
        </span>
      `,
    );
  });
});
