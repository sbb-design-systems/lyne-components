import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-radio-button';

describe('sbb-radio-button', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-radio-button value="radio-value"></sbb-radio-button>`);

    expect(root).dom.to.be.equal(
      `
        <sbb-radio-button aria-checked="false" aria-disabled="false" aria-required="false" size="m" value="radio-value" role="radio">
        </sbb-radio-button>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <label class="sbb-radio-button">
          <input aria-hidden="true" class="sbb-radio-button__input" tabindex="-1" type="radio" value="radio-value">
          <span class="sbb-radio-button__label-slot">
            <slot></slot>
          </span>
        </label>
      `,
    );
  });
});
