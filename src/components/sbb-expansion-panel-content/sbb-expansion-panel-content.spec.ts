import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-expansion-panel-content';

describe('sbb-expansion-panel-content', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-content slot="content" role="region">
          Content
        </sbb-expansion-panel-content>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-expansion-panel-content">
          <slot></slot>
        </div>
      `,
    );
  });

  it('renders expanded', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-content expanded>Content</sbb-expansion-panel-content>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-content slot="content" role="region" expanded>
          Content
        </sbb-expansion-panel-content>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-expansion-panel-content">
          <slot></slot>
        </div>
      `,
    );
  });
});
