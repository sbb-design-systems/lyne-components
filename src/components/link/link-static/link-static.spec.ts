import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './link-static';

describe('sbb-link-static', () => {
  it('renders a plain link-static with no icon', async () => {
    const root = await fixture(html`
      <sbb-link-static size="m" aria-label="Travelcards &amp; tickets">
        Travelcards &amp; tickets.
      </sbb-link-static>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-link-static
        aria-label="Travelcards &amp; tickets"
        data-slot-names="unnamed"
        dir="ltr"
        size="m"
        variant="block"
      >
        Travelcards &amp; tickets.
      </sbb-link-static>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link-static">
        <span class="sbb-link__icon">
          <slot name="icon">
          </slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders a negative link-static with provided icon', async () => {
    const root = await fixture(
      html` <sbb-link-static icon-placement="end" size="m" negative disabled>
        <sbb-icon name="chevron-small-right-small" slot="icon"></sbb-icon>
        Travelcards &amp; tickets.
      </sbb-link-static>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-link-static
        variant="block"
        icon-placement="end"
        size="m"
        negative
        disabled
        dir="ltr"
        data-slot-names="icon unnamed"
      >
        <sbb-icon name="chevron-small-right-small" slot="icon" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
        Travelcards &amp; tickets.
      </sbb-link-static>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link-static">
        <span class="sbb-link__icon">
          <slot name="icon"></slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders the static inline variant', async () => {
    const root = await fixture(
      html` <sbb-link-static variant="inline" size="m">
        Travelcards &amp; tickets.
      </sbb-link-static>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-link-static
        size="m"
        variant="inline"
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
