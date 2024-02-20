import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './link-static';

describe('sbb-link-static', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-link-static size="m"> Travelcards &amp; tickets. </sbb-link-static>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-link-static
        size="m"
        dir="ltr"
        data-slot-names="unnamed"
      >
        Travelcards &amp; tickets.
      </sbb-link-static>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link-static">
        <slot></slot>
      </span>
    `);
  });
});
