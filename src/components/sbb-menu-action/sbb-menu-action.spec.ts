import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-menu-action';

describe('sbb-menu-action', () => {
  it('renders component as button', async () => {
    const root = await fixture(html`
      <sbb-menu-action form="formid" name="name" type="submit">
        <span>Action</span>
      </sbb-menu-action>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-menu-action aria-disabled="false" form="formid" name="name" type="submit" role="button" tabindex="0" dir="ltr">
          <span>Action</span>
        </sbb-menu-action>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-menu-action">
          <span class="sbb-menu-action__content">
            <span class="sbb-menu-action__icon">
              <slot name="icon"></slot>
            </span>
            <span class="sbb-menu-action__label">
              <slot></slot>
            </span>
          </span>
        </span>
      `,
    );
  });

  it('renders component as link with icon and amount', async () => {
    const root = await fixture(html`
      <sbb-menu-action
        icon-name="menu-small"
        amount="123456"
        href="https://github.com/lyne-design-system/lyne-components"
        target="_blank"
      >
        <span>Action</span>
      </sbb-menu-action>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-menu-action aria-disabled="false" amount="123456" icon-name="menu-small" href="https://github.com/lyne-design-system/lyne-components" target="_blank" role="link" tabindex="0" dir="ltr">
          <span>Action</span>
        </sbb-menu-action>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <a class="sbb-menu-action" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank" role="presentation" tabindex="-1">
          <span class="sbb-menu-action__content">
            <span class="sbb-menu-action__icon">
              <slot name="icon">
                <sbb-icon name='menu-small'/>
              </slot>
            </span>
            <span class="sbb-menu-action__label">
              <slot></slot>
            </span>
            <span class="sbb-menu-action__amount">
              123456
            </span>
          </span>
          <span class="sbb-menu-action__opens-in-new-window">
            . Link target opens in new window.
          </span>
        </a>
      `,
    );
  });
});
