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
        <sbb-navigation class="sbb-navigation--closed" trigger="nav-trigger">
          <mock:shadow-root>
            <dialog class="sbb-navigation" id="sbb-dialog-1">
              <div class="sbb-navigation__header">
                <sbb-button 
                  accessibility-controls="sbb-dialog-1"
                  accessibility-label="Close modal" 
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
            </dialog>
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
