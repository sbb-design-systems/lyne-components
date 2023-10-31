import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-navigation';
import '../sbb-button';

describe('sbb-navigation', () => {
  it('renders', async () => {
    await fixture(html`
      <sbb-button id="nav-trigger">Navigation trigger</sbb-button>
      <sbb-navigation trigger="nav-trigger">
        <sbb-navigation-marker>
          <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>
          <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);
    const nav = document.querySelector('sbb-navigation');

    expect(nav).dom.to.be.equal(
      `
        <sbb-navigation trigger="nav-trigger" role="navigation" data-state="closed" id="sbb-navigation-1">
          <sbb-navigation-marker>
            <sbb-navigation-action id="nav-1">
              Tickets &amp; Offers
            </sbb-navigation-action>
            <sbb-navigation-action id="nav-2">
              Vacations &amp; Recreation
            </sbb-navigation-action>
          </sbb-navigation-marker>
        </sbb-navigation>
      `,
    );
    expect(nav).shadowDom.to.be.equal(
      `
        <div class="sbb-navigation__container">
          <div class="sbb-navigation" id="sbb-navigation-overlay">
            <div class="sbb-navigation__header">
              <sbb-button
                id="sbb-navigation-close-button"
                aria-label="Close navigation"
                aria-controls="sbb-navigation-overlay"
                class="sbb-navigation__close"
                data-icon-only=""
                dir="ltr"
                icon-name="cross-small"
                negative=""
                role="button"
                sbb-navigation-close=""
                size="m"
                tabindex="0"
                type="button"
                variant="transparent">
              </sbb-button>
            </div>
            <div class="sbb-navigation__wrapper">
              <div class="sbb-navigation__content">
                <slot></slot>
              </div>
            </div>
          </div>
          <slot name="navigation-section"></slot>
        </div>
      `,
    );
  });
});
