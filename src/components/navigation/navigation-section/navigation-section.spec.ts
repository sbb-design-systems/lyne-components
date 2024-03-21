import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private';

import './navigation-section';

describe(`sbb-navigation-section`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-section></sbb-navigation-section>`);

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-section slot="navigation-section" data-state="closed" id="sbb-navigation-section-1" aria-hidden="true">
        </sbb-navigation-section>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
