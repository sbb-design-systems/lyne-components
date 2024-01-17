import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../../core/testing';

import './header-button';

describe('sbb-header-button', () => {
  it('renders the component as a button with icon', async () => {
    const root = await fixture(html`
      <sbb-header-button
        icon-name="pie-small"
        name="test"
        type="reset"
        value="value"
        expand-from="zero"
      >
        Action
      </sbb-header-button>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-header-button icon-name='pie-small' expand-from="zero" name="test" type="reset" value="value" role="button" tabindex="0" data-expanded dir="ltr">
        Action
      </sbb-header-button>
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
});
