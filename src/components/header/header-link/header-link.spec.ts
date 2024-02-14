import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './header-link';

describe('sbb-header-link', () => {
  it('renders the component as a link with icon', async () => {
    const root = await fixture(
      html`<sbb-header-link
        expand-from="small"
        href="https://github.com/lyne-design-system/lyne-components"
        target="_blank"
        icon-name="pie-small"
        >Action</sbb-header-link
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-header-link
       data-expanded
       dir="ltr"
       expand-from="small"
       href="https://github.com/lyne-design-system/lyne-components"
       icon-name='pie-small'
       role="link"
       tabindex="0"
       target="_blank"
       >
        Action
      </sbb-header-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-header-link" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" role="presentation" tabindex="-1" target="_blank">
        <span class="sbb-header-action__wrapper">
          <span class="sbb-header-action__icon">
            <slot name="icon">
              <sbb-icon name="pie-small"></sbb-icon>
            </slot>
          </span>
          <span class="sbb-header-action__text">
            <slot></slot>
          </span>
        </span>
        <sbb-screenreader-only>
          . Link target opens in a new window.
        </sbb-screenreader-only>
      </a>
    `);
  });
});
