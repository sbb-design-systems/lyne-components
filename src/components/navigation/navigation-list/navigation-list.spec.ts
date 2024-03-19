import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private';

import './navigation-list';
import '../navigation-button';

describe(`sbb-navigation-list`, () => {
  it('renders', async () => {
    const root = await fixture(
      html` <sbb-navigation-list>
        <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
        <sbb-navigation-button>Vacations & Recreation</sbb-navigation-button>
        <sbb-navigation-button>Travel information</sbb-navigation-button>
        <sbb-navigation-button>Help & Contact</sbb-navigation-button>
      </sbb-navigation-list>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-list data-slot-names="li-0 li-1 li-2 li-3">
          <sbb-navigation-button data-action data-button dir="ltr" role="button" size="m" tabindex="0" slot="li-0">
            Tickets &amp; Offers
          </sbb-navigation-button>
          <sbb-navigation-button data-action data-button dir="ltr" role="button" size="m" tabindex="0" slot="li-1">
            Vacations &amp; Recreation
          </sbb-navigation-button>
          <sbb-navigation-button data-action data-button dir="ltr" role="button" size="m" tabindex="0" slot="li-2">
            Travel information
          </sbb-navigation-button>
          <sbb-navigation-button data-action data-button dir="ltr" role="button" size="m" tabindex="0" slot="li-3">
            Help &amp; Contact
          </sbb-navigation-button>
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
