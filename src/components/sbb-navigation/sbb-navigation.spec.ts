import { SbbNavigation } from './sbb-navigation';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigation],
      html: `
      <sbb-button id="nav-trigger">Navigation trigger</sbb-button>
      <sbb-navigation trigger="nav-trigger">
        <sbb-navigation-marker>
          <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>
          <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
        </sbb-navigation-marker>
      </sbb-navigation>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-navigation trigger="nav-trigger" role="navigation" data-state="closed" id="sbb-navigation-1">
          <mock:shadow-root>
            <div class="sbb-navigation__container">
              <div class="sbb-navigation" id="sbb-navigation-dialog">
                <div class="sbb-navigation__header">
                  <sbb-button
                    id="sbb-navigation-close-button"
                    aria-label="Close navigation"
                    aria-controls="sbb-navigation-dialog"
                    class="sbb-navigation__close"
                    icon-name="cross-small"
                    negative=""
                    sbb-navigation-close=""
                    size="m"
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
          </mock:shadow-root>
          <sbb-navigation-marker>
            <sbb-navigation-action id="nav-1">
              Tickets &amp; Offers
            </sbb-navigation-action>
            <sbb-navigation-action id="nav-2">
              Vacations &amp; Recreation
            </sbb-navigation-action>
          </sbb-navigation-marker>
        </sbb-navigation>
      `);
  });
});
