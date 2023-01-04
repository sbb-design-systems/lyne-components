import { SbbNavigationList } from './sbb-navigation-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationList],
      html: `
      <sbb-navigation-list>
        <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
        <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
        <sbb-navigation-action>Travel information</sbb-navigation-action>
        <sbb-navigation-action>Help & Contact</sbb-navigation-action>
      </sbb-navigation-list>`,
    });

    expect(root).toEqualHtml(`
      <sbb-navigation-list class="sbb-navigation-list">
        <mock:shadow-root>
          <ul class="sbb-navigation-list__content">
            <li class="sbb-navigation-list__action">
              <slot name="action-0"></slot>
            </li>
            <li class="sbb-navigation-list__action">
              <slot name="action-1"></slot>
            </li>
            <li class="sbb-navigation-list__action">
              <slot name="action-2"></slot>
            </li>
            <li class="sbb-navigation-list__action">
              <slot name="action-3"></slot>
            </li>
          </ul>
          <span hidden="">
            <slot></slot>
          </span>
        </mock:shadow-root>
        <sbb-navigation-action slot="action-0">
          Tickets &amp; Offers
        </sbb-navigation-action>
        <sbb-navigation-action slot="action-1">
          Vacations &amp; Recreation
        </sbb-navigation-action>
        <sbb-navigation-action slot="action-2">
          Travel information
        </sbb-navigation-action>
        <sbb-navigation-action slot="action-3">
          Help &amp; Contact
        </sbb-navigation-action>
      </sbb-navigation-list>
    `);
  });
});
