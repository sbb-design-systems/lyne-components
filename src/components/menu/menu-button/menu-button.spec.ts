import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import './menu-button.js';

describe(`sbb-menu-button`, () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-menu-button form="formid" name="name" type="submit">
        <span>Action</span>
      </sbb-menu-button>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-menu-button  form="formid" name="name" type="submit" role="button" tabindex="0" dir="ltr" data-action data-button>
        <span>Action</span>
      </sbb-menu-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-menu-button">
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon"></slot>
          </span>
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
        </span>
      </span>
    `);
  });

  it('renders component with icon and amount', async () => {
    const root = await fixture(html`
      <sbb-menu-button icon-name="menu-small" amount="123456">
        <span>Action</span>
      </sbb-menu-button>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-menu-button amount="123456" icon-name="menu-small" role="button" tabindex="0" dir="ltr" data-action data-button>
        <span>Action</span>
      </sbb-menu-button>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-menu-button">
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
      </span>
    `);
  });
});
