import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-radio-button-group';

describe('sbb-radio-button-group', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-radio-button-group></sbb-radio-button-group>`);

    expect(root).dom.to.be.equal(
      `
        <sbb-radio-button-group orientation="horizontal" role="radiogroup">
        </sbb-radio-button-group>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
      <div class="sbb-radio-group">
        <slot></slot>
      </div>
      `,
    );
  });
});
