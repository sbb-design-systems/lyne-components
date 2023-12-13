import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './container';

describe('sbb-container', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-container></sbb-container>`);

    expect(root).dom.to.be.equal(`<sbb-container variant="transparent"></sbb-container>`);

    expect(root).shadowDom.to.equal(
      `<div class="sbb-container">
        <slot>
        </slot>
      </div>
      `,
    );
  });
});
