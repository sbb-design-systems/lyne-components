import { SbbAutocomplete } from './sbb-autocomplete';
import { newSpecPage } from '@stencil/core/testing';

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
          <div class="sbb-autocomplete__container">
            <div class="sbb-autocomplete__gap-fix">
              <div class="gap-fix-wrapper">
                <div class="gap-fix-corner" id="left"></div>
              </div>

              <div class="gap-fix-wrapper">
                <div class="gap-fix-corner" id="right"></div>
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
      components: [SbbAutocomplete],
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
      <sbb-autocomplete data-state="closed">
        <mock:shadow-root>
          <div class="sbb-autocomplete__container">
            <div class="sbb-autocomplete__gap-fix">
              <div class="gap-fix-wrapper">
                <div class="gap-fix-corner" id="left"></div>
              </div>

              <div class="gap-fix-wrapper">
                <div class="gap-fix-corner" id="right"></div>
              </div>
            </div>
            <div class="sbb-autocomplete__panel">
              <div class="sbb-autocomplete__wrapper" id="sbb-autocomplete-2" role="listbox">
                <div class="sbb-autocomplete__options">
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
});
