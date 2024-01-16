import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './navigation-list';

describe('sbb-navigation-list', () => {
  it('renders', async () => {
    const root = await fixture(
      html` <sbb-navigation-list>
        <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
        <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
        <sbb-navigation-action>Travel information</sbb-navigation-action>
        <sbb-navigation-action>Help & Contact</sbb-navigation-action>
      </sbb-navigation-list>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-list data-slot-names="action-0 action-1 action-2 action-3">
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
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('should render named slots if data-ssr-child-count attribute is set', async () => {
    const root = await fixture(
      html`<sbb-navigation-list data-ssr-child-count="3"></sbb-navigation-list>`,
    );
    await expect(root).shadowDom.to.equalSnapshot();
  });
});
