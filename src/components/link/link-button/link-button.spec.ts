import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './link-button';

describe('sbb-link-button', () => {
  it('renders a plain link-button with no icon', async () => {
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
        variant="block"
      >
        Travelcards &amp; tickets.
      </sbb-link-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link-button">
        <span class="sbb-link__icon">
          <slot name="icon">
          </slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders a negative link-button with provided icon', async () => {
    const root = await fixture(
      html` <sbb-link-button
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
      </sbb-link-button>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-link-button
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
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="chevron-small-right-small"
          role="img"
          slot="icon"
        ></sbb-icon>

        Travelcards &amp; tickets.
      </sbb-link-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-link-button">
        <span class="sbb-link__icon">
          <slot name="icon"></slot>
        </span>
        <slot></slot>
      </span>
    `);
  });

  it('renders the inline variant', async () => {
    const root = await fixture(
      html` <sbb-link-button variant="inline" size="m" form="form" value="value">
        Travelcards &amp; tickets.
      </sbb-link-button>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-link-button
        size="m"
        variant="inline"
        form='form'
        value="value"
        role="button"
        tabindex="0"
        dir="ltr"
        data-slot-names="unnamed"
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
