import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './block-link-button';

describe('sbb-block-link-button', () => {
  it('renders a negative link-button with provided icon', async () => {
    const root = await fixture(
      html` <sbb-block-link-button
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
      </sbb-block-link-button>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-block-link-button
        role="button"
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
      </sbb-block-link-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-block-link-button">
        <span class="sbb-link__icon">
          <slot name="icon"></slot>
        </span>
        <slot></slot>
      </span>
    `);
  });
});
