import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '.';

describe('sbb-navigation-marker', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-marker></sbb-navigation-marker>`);

    expect(root).dom.to.be.equal(`<sbb-navigation-marker size="l"></sbb-navigation-marker>`);
    expect(root).shadowDom.to.be.equal(
      `
        <span hidden="">
          <slot></slot>
        </span>
      `,
    );
  });
});
