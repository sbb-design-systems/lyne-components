import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './navigation-button';

describe('sbb-navigation-button', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-button></sbb-navigation-button>`);

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-button size="l" role="button" tabindex="0" dir="ltr">
        </sbb-navigation-button>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-navigation-button">
          <slot></slot>
        </span>
      `,
    );
  });
});
