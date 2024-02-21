import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './block-link';

describe('sbb-block-link', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-block-link
        href="https://github.com/lyne-design-system/lyne-components"
        size="m"
        download
        aria-label="Travelcards &amp; tickets"
      >
        Travelcards &amp; tickets.
      </sbb-block-link>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-block-link
        href="https://github.com/lyne-design-system/lyne-components"
        size="m"
        download
        aria-label="Travelcards &amp; tickets"
        role="link"
        tabindex="0"
        dir="ltr"
        icon-placement="start"
        data-slot-names="unnamed"
      >
        Travelcards &amp; tickets.
      </sbb-block-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a
        class="sbb-action-base sbb-block-link"
        download
        href="https://github.com/lyne-design-system/lyne-components"
        role="presentation"
        tabindex="-1"
      >
        <span class="sbb-link__icon">
          <slot name="icon">
          </slot>
        </span>
        <slot></slot>
      </a>
    `);
  });
});
