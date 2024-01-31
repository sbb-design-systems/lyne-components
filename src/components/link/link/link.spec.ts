import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './link';

describe('sbb-link', () => {
  it('renders a plain link with no icon', async () => {
    const root = await fixture(html`
      <sbb-link
        href="https://github.com/lyne-design-system/lyne-components"
        size="m"
        download
        aria-label="Travelcards &amp; tickets"
      >
        Travelcards &amp; tickets.
      </sbb-link>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-link
        variant="block"
        href="https://github.com/lyne-design-system/lyne-components"
        size="m"
        download
        aria-label="Travelcards &amp; tickets"
        role="link"
        tabindex="0"
        dir="ltr"
        data-slot-names="unnamed"
      >
        Travelcards &amp; tickets.
      </sbb-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a
        class="sbb-link"
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

  it('renders the inline variant', async () => {
    const root = await fixture(
      html` <sbb-link variant="inline" size="m" href="#" target="_blank">
        Travelcards &amp; tickets.
      </sbb-link>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-link
        size="m"
        variant="inline"
        href="#"
        role="link"
        tabindex="0"
        target="_blank"
        dir="ltr"
        data-slot-names="unnamed"
      >

        Travelcards &amp; tickets.
      </sbb-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-link" href="#" rel="external noopener nofollow" role="presentation" tabindex="-1" target="_blank">
        <slot></slot>
        <span class="sbb-link__opens-in-new-window">. Link target opens in new window.</span>
      </a>
    `);
  });
});
