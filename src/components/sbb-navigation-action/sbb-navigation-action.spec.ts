import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-navigation-action', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-action />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-action size="l" role="button" tabindex="0" dir="ltr">  
        </sbb-navigation-action>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-navigation-action">
          <slot></slot>
        </span>
      `,
    );
  });
});
