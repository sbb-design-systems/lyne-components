import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './block-link-static';

describe('sbb-block-link-static', () => {
  it('renders', async () => {
    const root = await fixture(
      html` <sbb-block-link-static icon-placement="end" size="m">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="chevron-small-right-small"
          role="img"
          slot="icon"
        ></sbb-icon>
        Travelcards &amp; tickets.
      </sbb-block-link-static>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-block-link-static
        icon-placement="end"
        size="m"
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
      </sbb-block-link-static>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-block-link-static">
        <span class="sbb-link__icon">
          <slot name="icon"></slot>
        </span>
        <slot></slot>
      </span>
    `);
  });
});
