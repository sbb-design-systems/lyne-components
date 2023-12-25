import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './toggle-option';
import '../../icon';

describe('sbb-toggle-option', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-toggle-option checked value="Option 1"></sbb-toggle-option>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-toggle-option aria-checked="true" checked="" role="radio" tabindex="0" value="Option 1">

      </sbb-toggle-option>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <input aria-hidden="true" id="sbb-toggle-option-id" tabindex="-1" type="radio" value="Option 1">
          <label class="sbb-toggle-option" for="sbb-toggle-option-id">
            <span class="sbb-toggle-option__label">
              <slot></slot>
            </span>
          </label>
        `,
    );
  });

  it('renders with sbb-icon', async () => {
    const root = await fixture(
      html`<sbb-toggle-option checked icon-name="arrow-right-small"></sbb-toggle-option>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-toggle-option
        aria-checked="true"
        checked=""
        icon-name="arrow-right-small"
        role="radio"
        tabindex="0"
        data-icon-only
      >

      </sbb-toggle-option>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <input aria-hidden="true" id="sbb-toggle-option-id" tabindex="-1" type="radio">
          <label class="sbb-toggle-option" for="sbb-toggle-option-id">
            <slot name="icon">
              <sbb-icon aria-hidden="true" data-namespace="default" name="arrow-right-small" role="img"></sbb-icon>
            </slot>
            <span class="sbb-toggle-option__label">
              <slot></slot>
            </span>
          </label>
        `,
    );
  });
});
