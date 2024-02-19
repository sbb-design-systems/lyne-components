import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './menu';
import '../menu-button';

describe('sbb-menu', () => {
  it('renders', async () => {
    await fixture(html`
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu trigger="menu-trigger">
        <sbb-link href="https://www.sbb.ch/en" variant="block">Profile</sbb-link>
        <sbb-menu-button icon-name="tick-small">View</sbb-menu-button>
        <sbb-menu-button icon-name="pen-small" amount="1" disabled>Edit</sbb-menu-button>
        <sbb-menu-button icon-name="swisspass-small" amount="2">Details</sbb-menu-button>
        <sbb-divider></sbb-divider>
        <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
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
          <sbb-menu-button icon-name="tick-small">View</sbb-menu-button>
          <sbb-menu-button icon-name="pen-small" amount="1" disabled>Edit</sbb-menu-button>
          <sbb-menu-button icon-name="swisspass-small" amount="2">Details</sbb-menu-button>
          <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
        </sbb-menu>`,
    );
    const menu = document.querySelector('sbb-menu');

    // TODO: Figure out why this is necessary.
    await aTimeout(10);

    expect(menu).dom.to.be.equal(
      `
    <sbb-menu data-state="closed" id="sbb-menu-1" trigger="menu-trigger">

      <sbb-menu-button dir="ltr" icon-name="tick-small" role="button" slot="li-0" tabindex="0">
        View
      </sbb-menu-button>
      <sbb-menu-button aria-disabled="true" dir="ltr" amount="1" disabled icon-name="pen-small" role="button" slot="li-1">
        Edit
      </sbb-menu-button>
      <sbb-menu-button dir="ltr" amount="2" icon-name="swisspass-small" role="button" slot="li-2" tabindex="0">
        Details
      </sbb-menu-button>
      <sbb-menu-button dir="ltr" icon-name="cross-small" role="button" slot="li-3" tabindex="0">
        Cancel
      </sbb-menu-button>
    </sbb-menu>
    `,
    );
    await expect(menu).shadowDom.to.equalSnapshot();
  });
});
