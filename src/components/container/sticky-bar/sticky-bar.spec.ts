import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sticky-bar';

describe('sbb-sticky-bar', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);

    expect(root).dom.to.be.equal(`<sbb-sticky-bar slot="sticky-bar"></sbb-sticky-bar>`);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-sticky-bar__wrapper">
        <div class="sbb-sticky-bar">
          <slot></slot>
        </div>
      </div>
      <div class="sbb-sticky-bar__intersector">
      </div>
    `);
  });
});
