import { SbbAutocomplete } from './sbb-autocomplete';
import { newSpecPage } from '@stencil/core/testing';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';

describe('sbb-autocomplete', () => {
  it('renders standalone', async () => {
    const { root } = await newSpecPage({
      components: [SbbAutocomplete],
      html: `
        <div id="autocomplete-origin"></div>
        <input id="autocomplete-trigger" />
        <sbb-autocomplete origin="autocomplete-origin" trigger="autocomplete-trigger">
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-autocomplete>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-autocomplete data-state="closed" origin="autocomplete-origin" trigger="autocomplete-trigger">
        <mock:shadow-root>
          <div class="sbb-autocomplete__gap-fix"></div>
          <div class="sbb-autocomplete__container">
            <div class="sbb-autocomplete__gap-fix">
              <div class="sbb-gap-fix-wrapper">
                <div class="sbb-gap-fix-corner" id="left"></div>
              </div>
              <div class="sbb-gap-fix-wrapper">
                <div class="sbb-gap-fix-corner" id="right"></div>
              </div>
            </div>
            <div class="sbb-autocomplete__panel">
              <div class="sbb-autocomplete__wrapper">
                <div class="sbb-autocomplete__options" role="listbox" id="sbb-autocomplete-1">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-option value="1">1</sbb-option>
        <sbb-option value="2">2</sbb-option>
      </sbb-autocomplete>
    `);
  });

  it('renders in form field', async () => {
    const { root } = await newSpecPage({
      components: [SbbAutocomplete, SbbFormField],
      html: `
        <sbb-form-field>
          <input />
          <sbb-autocomplete>
            <sbb-option value="1">1</sbb-option>
            <sbb-option value="2">2</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" size="m" width="default">
        <mock:shadow-root>
          <div class="sbb-form-field__space-wrapper">
            <div class="sbb-form-field__wrapper" id="form-field-wrapper">
              <slot name="prefix"></slot>
              <div class="sbb-form-field__input-container">
                <div class="sbb-form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div aria-live="polite" class="sbb-form-field__error">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <input
          aria-autocomplete="list" aria-controls="sbb-autocomplete-2" aria-expanded="false" aria-haspopup="listbox"
          aria-owns="sbb-autocomplete-2" autocomplete="off" role="combobox">
        <sbb-autocomplete data-state="closed">
          <mock:shadow-root>
            <div class="sbb-autocomplete__gap-fix"></div>
            <div class="sbb-autocomplete__container">
              <div class="sbb-autocomplete__gap-fix">
                <div class="sbb-gap-fix-wrapper">
                  <div class="sbb-gap-fix-corner" id="left"></div>
                </div>
                <div class="sbb-gap-fix-wrapper">
                  <div class="sbb-gap-fix-corner" id="right"></div>
                </div>
              </div>
              <div class="sbb-autocomplete__panel">
                <div class="sbb-autocomplete__wrapper">
                  <div class="sbb-autocomplete__options" id="sbb-autocomplete-2" role="listbox">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>
          </mock:shadow-root>
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
    `);
  });
});
