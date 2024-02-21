import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './teaser-paid';

describe('sbb-teaser-paid', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-teaser-paid my-prop="Label"></sbb-teaser-paid>`);

    expect(root).dom.to.be.equal(`
      <sbb-teaser-paid
        dir="ltr"
        my-prop="Label"
        role="link"
        tabindex="0"
      ></sbb-teaser-paid>
    `);

    expect(root).shadowDom.to.be.equal(`
    <a
      class="sbb-teaser-paid"
      role="presentation"
      tabindex="-1"
    >
      <slot name="chip">
      </slot>
      <slot name="image">
      </slot>
    </a>
    `);
  });
});
