import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './link-button';

describe('sbb-link-button', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-link-button
        name="name"
        type="button"
        form="form"
        value="value"
        size="m"
        aria-label="Travelcards &amp; tickets"
      >
        Travelcards &amp; tickets.
      </sbb-link-button>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-link-button
        aria-label="Travelcards &amp; tickets"
        data-slot-names="unnamed"
        dir="ltr"
        form="form"
        name="name"
        role="button"
        size="m"
        tabindex="0"
        type="button"
        value="value"
      >
        Travelcards &amp; tickets.
      </sbb-link-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link-button">
        <slot></slot>
      </span>
    `);
  });
});
