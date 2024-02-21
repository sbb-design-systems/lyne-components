import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './link';

describe('sbb-link', () => {
  it('renders', async () => {
    const root = await fixture(
      html` <sbb-link size="m" href="#" target="_blank"> Travelcards &amp; tickets. </sbb-link>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-link
        size="m"
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
      <a class="sbb-action-base sbb-link" href="#" rel="external noopener nofollow" role="presentation" tabindex="-1" target="_blank">
        <slot></slot>
        <sbb-screenreader-only>
          . Link target opens in a new window.
        </sbb-screenreader-only>
      </a>
    `);
  });
});
