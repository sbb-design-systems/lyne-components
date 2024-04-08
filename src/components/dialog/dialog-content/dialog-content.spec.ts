import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './dialog-content';

describe('sbb-dialog-content', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-dialog-content slot="content">Content</sbb-dialog-content>`,
    );

    expect(root).dom.to.be.equal(
      `<sbb-dialog-content slot="content" slot="content">Content</sbb-dialog-content>`,
    );

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-dialog-content">
        <slot></slot>
      </div>
    `);
  });
});
