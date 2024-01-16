import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './form-field-clear';
import '../form-field';

describe('sbb-form-field-clear', () => {
  it('renders', async () => {
    const formField = await fixture(html`
      <sbb-form-field label="Label">
        <input type="text" placeholder="Input placeholder" value="Input value" />
        <sbb-form-field-clear></sbb-form-field-clear>
      </sbb-form-field>
    `);
    await waitForLitRender(formField);

    const formFieldClear = formField.querySelector('sbb-form-field-clear');

    expect(formField).dom.to.be.equal(`
      <sbb-form-field error-space="none" label="Label" size="m" width="default" data-input-type="input" data-slot-names="label suffix unnamed">
        <label data-creator="SBB-FORM-FIELD" slot="label" for="sbb-form-field-input-0">
          Label
        </label>
        <input placeholder="Input placeholder" type="text" value="Input value" id="sbb-form-field-input-0">
        <sbb-form-field-clear aria-label="Clear input value" dir="ltr" role="button" slot="suffix" tabindex="0">
        </sbb-form-field-clear>
      </sbb-form-field>
    `);

    expect(formField).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <span aria-hidden="true" class="sbb-form-field__label-spacer"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label"></slot>
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);

    expect(formFieldClear).shadowDom.to.be.equal(`
      <span class="sbb-form-field-clear">
        <sbb-icon name="cross-small" aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
      </span>
    `);
  });
});
