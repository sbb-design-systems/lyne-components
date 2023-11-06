import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './header-action';

describe('sbb-header-action', () => {
  it('renders the component as a button with icon', async () => {
    const root = await fixture(html`
      <sbb-header-action
        icon-name="pie-small"
        name="test"
        type="reset"
        value="value"
        expand-from="zero"
      >
        Action
      </sbb-header-action>
    `);

    expect(root).dom.to.be.equal(
      `
      <sbb-header-action icon-name='pie-small' expand-from="zero" name="test" type="reset" value="value" role="button" tabindex="0" data-expanded dir="ltr">
        Action
      </sbb-header-action>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <span class="sbb-header-action">
            <span class="sbb-header-action__wrapper">
              <span class="sbb-header-action__icon">
                <slot name="icon">
                  <sbb-icon
                   aria-hidden="true"
                   data-namespace="default"
                   name="pie-small"
                   role="img"
                  ></sbb-icon>
                </slot>
              </span>
              <span class="sbb-header-action__text">
                <slot></slot>
              </span>
            </span>
          </span>
        `,
    );
  });

  it('renders the component as a link without icon', async () => {
    const root = await fixture(
      html`<sbb-header-action
        expand-from="small"
        href="https://github.com/lyne-design-system/lyne-components"
        target="_blank"
        >Action</sbb-header-action
      >`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-header-action
       data-expanded
       dir="ltr"
       expand-from="small"
       href="https://github.com/lyne-design-system/lyne-components"
       role="link"
       tabindex="0"
       target="_blank"
       >
        Action
      </sbb-header-action>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <a class="sbb-header-action" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" role="presentation" tabindex="-1" target="_blank">
            <span class="sbb-header-action__wrapper">
              <span class="sbb-header-action__icon">
                <slot name="icon"/>
              </span>
              <span class="sbb-header-action__text">
                <slot></slot>
                <span class="sbb-header-action__opens-in-new-window">
                  . Link target opens in new window.
                </span>
              </span>
            </span>
          </a>
        `,
    );
  });
});
