import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './accordion';
import '../expansion-panel';

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
          <sbb-expansion-panel data-accordion data-accordion-first>
            <sbb-expansion-panel-header
              aria-controls="sbb-expansion-panel-content-1"
              aria-expanded="false"
              dir="ltr"
              id="sbb-expansion-panel-header-1"
              role="button"
              slot="header"
              tabindex="0"
            >Header 1</sbb-expansion-panel-header>
            <sbb-expansion-panel-content
              aria-hidden="true"
              aria-labelledby="sbb-expansion-panel-header-1"
              id="sbb-expansion-panel-content-1"
              role="region"
              slot="content"
            >Content 1</sbb-expansion-panel-content>
          </sbb-expansion-panel>
          <sbb-expansion-panel data-accordion data-accordion-last>
            <sbb-expansion-panel-header
              aria-controls="sbb-expansion-panel-content-2"
              aria-expanded="false"
              dir="ltr"
              id="sbb-expansion-panel-header-2"
              role="button"
              slot="header"
              tabindex="0">Header 2</sbb-expansion-panel-header>
            <sbb-expansion-panel-content
              aria-hidden="true"
              aria-labelledby="sbb-expansion-panel-header-2"
              id="sbb-expansion-panel-content-2"
              role="region"
              slot="content"
            >Content 2</sbb-expansion-panel-content>
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
