import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-accordion';

describe('sbb-accordion', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-accordion>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-accordion>
          <sbb-expansion-panel>
            <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
          </sbb-expansion-panel>
          <sbb-expansion-panel>
            <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
          </sbb-expansion-panel>
        </sbb-accordion>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-accordion">
          <slot></slot>
        </div>
      `,
    );
  });
});
