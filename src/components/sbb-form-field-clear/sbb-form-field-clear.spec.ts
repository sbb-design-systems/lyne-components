import { SbbFormField } from '../sbb-form-field/sbb-form-field';
import { SbbFormFieldClear } from './sbb-form-field-clear';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-form-field-clear', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField, SbbFormFieldClear],
      html: `<sbb-form-field label="Label">
          <input type="text" placeholder="Input placeholder" value="Input value" />
          <sbb-form-field-clear />
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" label="Label" size="m" width="default">
        <mock:shadow-root>
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
        </mock:shadow-root>
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Label
        </label>
        <input placeholder="Input placeholder" type="text" value="Input value">
        <sbb-form-field-clear aria-label="Clear input value" dir="ltr" role="button" slot="suffix" tabindex="0">
          <mock:shadow-root>
            <span class="sbb-form-field-clear">
              <sbb-icon name="cross-small"></sbb-icon>
            </span>
          </mock:shadow-root>
        </sbb-form-field-clear>
      </sbb-form-field>`);
  });
});
