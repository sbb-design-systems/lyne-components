import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

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

  it('renders a link as a button with provided icon', async () => {
    const root = await fixture(
      html` <sbb-link
        icon-placement="end"
        size="m"
        negative
        name="name"
        type="submit"
        form="formid"
        disabled
      >
        <sbb-icon name="chevron-small-right-small" slot="icon"></sbb-icon>
        Travelcards &amp; tickets.
      </sbb-link>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-link
        role="button"
        variant="block"
        icon-placement="end"
        size="m"
        negative
        name="name"
        type="submit"
        form="formid"
        disabled
        aria-disabled="true"
        dir="ltr"
        data-slot-names="icon unnamed"
      >
        <sbb-icon name="chevron-small-right-small" slot="icon" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
        Travelcards &amp; tickets.
      </sbb-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link">
        <span class="sbb-link__icon">
          <slot name="icon"></slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders a link as a span with sbb-icon', async () => {
    const root = (
      await fixture(
        html` <a>
          <sbb-link icon-placement="end" icon-name="chevron-small-right-small" size="m">
            Travelcards &amp; tickets.
          </sbb-link>
        </a>`,
      )
    ).querySelector('sbb-link');

    expect(root).dom.to.be.equal(`
      <sbb-link
          icon-placement="end"
          icon-name="chevron-small-right-small"
          size="m"
          variant="block"
          is-static
          dir="ltr"
          data-slot-names="unnamed"
          >

        Travelcards &amp; tickets.
      </sbb-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link">
        <span class="sbb-link__icon">
          <slot name="icon">
            <sbb-icon name="chevron-small-right-small" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
          </slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders a link as a span by setting is-static property', async () => {
    const root = await fixture(html` <sbb-link is-static> Travelcards &amp; tickets. </sbb-link> `);

    expect(root).dom.to.be.equal(`
      <sbb-link dir="ltr" variant="block" is-static size="s" data-slot-names="unnamed">
        Travelcards &amp; tickets.
      </sbb-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link">
        <span class="sbb-link__icon">
          <slot name="icon">
          </slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders the inline variant', async () => {
    const root = await fixture(
      html` <sbb-link variant="inline" size="m" href="#link" target="_blank">
        Travelcards &amp; tickets.
      </sbb-link>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-link
        size="m"
        variant="inline"
        href="#link"
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
      <a class="sbb-link" href="#link" rel="external noopener nofollow" role="presentation" tabindex="-1" target="_blank">
        <slot></slot>
        <span class="sbb-link__opens-in-new-window">. Link target opens in new window.</span>
      </a>
    `);
  });
});
