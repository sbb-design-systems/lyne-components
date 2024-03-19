import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './navigation-button';
import { fixture } from '../../core/testing/private';

describe(`sbb-navigation-button`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-button></sbb-navigation-button>`);

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-button size="l" role="button" tabindex="0" dir="ltr" data-action data-button>
        </sbb-navigation-button>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-action-base sbb-navigation-button">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="dash-small"
            role="img"
          >
          </sbb-icon>
          <slot></slot>
        </span>
      `,
    );
  });
});
