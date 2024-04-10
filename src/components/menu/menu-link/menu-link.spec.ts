import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private/index.js';

import './menu-link.js';

describe(`sbb-menu-link`, () => {
  it('renders component with icon and amount', async () => {
    const root = await fixture(html`
      <sbb-menu-link
        icon-name="menu-small"
        amount="123456"
        href="https://github.com/lyne-design-system/lyne-components"
        target="_blank"
      >
        <span>Action</span>
      </sbb-menu-link>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-menu-link amount="123456" icon-name="menu-small" href="https://github.com/lyne-design-system/lyne-components" target="_blank" role="link" tabindex="0" dir="ltr" data-action data-link>
        <span>Action</span>
      </sbb-menu-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-action-base sbb-menu-link" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank" role="presentation" tabindex="-1">
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon">
              <sbb-icon
                aria-hidden="true"
                data-namespace="default"
                name="menu-small"
                role="img"
              >
            </slot>
          </span>
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          <span class="sbb-menu-action__amount">
            123456
          </span>
        </span>
        <sbb-screen-reader-only>
          . Link target opens in a new window.
        </sbb-screen-reader-only>
      </a>
    `);
  });
});
