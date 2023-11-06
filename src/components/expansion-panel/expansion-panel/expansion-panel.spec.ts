import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-expansion-panel';

describe('sbb-expansion-panel', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-expansion-panel>
        <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel>
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-expansion-panel">
          <div class="sbb-expansion-panel__header">
            <slot name="header"></slot>
          </div>
          <div class="sbb-expansion-panel__content-wrapper">
            <span class="sbb-expansion-panel__content">
              <slot name="content"></slot>
            </span>
          </div>
        </div>
      `,
    );
  });

  it('renders with level set', async () => {
    const root = await fixture(html`
      <sbb-expansion-panel title-level="4">
        <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel title-level="4">
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-expansion-panel">
          <h4 class="sbb-expansion-panel__header">
            <slot name="header"></slot>
          </h4>
          <div class="sbb-expansion-panel__content-wrapper">
            <span class="sbb-expansion-panel__content">
              <slot name="content"></slot>
            </span>
          </div>
        </div>
      `,
    );
  });
});
