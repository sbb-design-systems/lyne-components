import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../sbb-navigation-marker';

describe('sbb-navigation-marker', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-marker></sbb-navigation-marker>`);

    expect(root).dom.to.be.equal(`<sbb-navigation-marker size="l"></sbb-navigation-marker>`);
    expect(root).shadowDom.to.be.equal(
      `
        <ul class="sbb-navigation-marker"></ul>
        <span hidden="">
          <slot></slot>
        </span>
      `,
    );
  });
});
