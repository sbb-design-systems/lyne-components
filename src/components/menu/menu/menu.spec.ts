import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './menu';
import '../menu-action';

describe('sbb-menu', () => {
  it('renders', async () => {
    await fixture(html`
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu trigger="menu-trigger">
        <sbb-link href="https://www.sbb.ch/en" variant="block">Profile</sbb-link>
        <sbb-menu-action icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
        <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
        <sbb-divider></sbb-divider>
        <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>
    `);
    const menu = document.querySelector('sbb-menu');

    await expect(menu).dom.to.equalSnapshot();
    expect(menu).shadowDom.to.be.equal(
      `
          <div class="sbb-menu__container">
            <div class="sbb-menu">
              <div class="sbb-menu__content">
                <slot></slot>
              </div>
            </div>
          </div>
        `,
    );
  });

  it('renders with list', async () => {
    await fixture(
      html` <sbb-button id="menu-trigger">Menu trigger</sbb-button>
        <sbb-menu trigger="menu-trigger">
          <sbb-menu-action icon="tick-small">View</sbb-menu-action>
          <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
          <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
          <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
        </sbb-menu>`,
    );
    const menu = document.querySelector('sbb-menu');

    // TODO: Figure out why this is necessary.
    await aTimeout(10);

    expect(menu).dom.to.be.equal(
      `
    <sbb-menu data-state="closed" id="sbb-menu-2" trigger="menu-trigger">

      <sbb-menu-action dir="ltr" icon="tick-small" role="button" slot="action-0" tabindex="0">
        View
      </sbb-menu-action>
      <sbb-menu-action aria-disabled="true" dir="ltr" amount="1" disabled icon="pen-small" role="button" slot="action-1">
        Edit
      </sbb-menu-action>
      <sbb-menu-action dir="ltr" amount="2" icon="swisspass-small" role="button" slot="action-2" tabindex="0">
        Details
      </sbb-menu-action>
      <sbb-menu-action dir="ltr" icon="cross-small" role="button" slot="action-3" tabindex="0">
        Cancel
      </sbb-menu-action>
    </sbb-menu>
    `,
    );
    await expect(menu).shadowDom.to.equalSnapshot();
  });
});
