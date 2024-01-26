import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './container';

describe('sbb-container', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-container></sbb-container>`);

    expect(root).dom.to.be.equal(`<sbb-container color="transparent"></sbb-container>`);

    expect(root).shadowDom.to.equal(
      `<div class="sbb-container__wrapper">
        <div class="sbb-container">
          <slot>
          </slot>
        </div>
        <slot name="sticky-bar"></slot>
      </div>
      `,
    );
  });
});
