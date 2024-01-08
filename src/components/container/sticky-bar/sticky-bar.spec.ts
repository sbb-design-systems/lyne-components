import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sticky-bar';

describe('sbb-sticky-bar', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);

    expect(root).dom.to.be.equal(`<sbb-sticky-bar></sbb-sticky-bar>`);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-sticky-bar">
        <slot></slot>
      </div>
      <span>
      </span>
    `);
  });
});
