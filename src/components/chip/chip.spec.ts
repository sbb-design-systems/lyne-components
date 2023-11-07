import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './chip';

describe('sbb-chip', () => {
  it('renders', async () => {
    const root: Element = await fixture(html`<sbb-chip>Label</sbb-chip>`);

    expect(root).dom.to.be.equal(`<sbb-chip color="milk" size="xxs">Label</sbb-chip>`);

    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-chip">
        <span class="sbb-chip__text-wrapper">
          <slot></slot>
        </span>
      </span>
    `);
  });
});
