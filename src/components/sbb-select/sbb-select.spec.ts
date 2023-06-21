import { SbbSelect } from './sbb-select';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-select', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelect],
      html: `
        <sbb-select>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-option value="2">Option 2</sbb-option>
          <sbb-option value="3">Option 3</sbb-option>
        </sbb-select>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-select data-state="closed" dir="ltr">
        <mock:shadow-root>
          <div class="sbb-select__trigger" aria-hidden="true">
            <span class="sbb-select__trigger--placeholder"></span>
          </div>
          <div class="sbb-select__gap-fix"></div>
          <div class="sbb-select__container">
            <div class="sbb-select__gap-fix">
              <div class="sbb-gap-fix-wrapper">
                <div class="sbb-gap-fix-corner" id="left"></div>
              </div>
              <div class="sbb-gap-fix-wrapper">
                <div class="sbb-gap-fix-corner" id="right"></div>
              </div>
            </div>
            <div class="sbb-select__panel">
              <div class="sbb-select__wrapper">
                <div id="sbb-select-1" class="sbb-select__options" role="listbox">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-option value="1">Option 1</sbb-option>
        <sbb-option value="2">Option 2</sbb-option>
        <sbb-option value="3">Option 3</sbb-option>
      </sbb-select>
    `);
  });

  it('renders multiple', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelect],
      html: `
        <sbb-select multiple>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-option value="2">Option 2</sbb-option>
          <sbb-option value="3">Option 3</sbb-option>
        </sbb-select>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-select data-state="closed"
                  multiple=""
                  data-multiple
                  data-state="closed"
                  dir="ltr">
        <mock:shadow-root>
          <div class="sbb-select__trigger" aria-hidden="true">
            <span class="sbb-select__trigger--placeholder"></span>
          </div>
          <div class="sbb-select__gap-fix"></div>
          <div class="sbb-select__container">
            <div class="sbb-select__gap-fix">
              <div class="sbb-gap-fix-wrapper">
                <div class="sbb-gap-fix-corner" id="left"></div>
              </div>
              <div class="sbb-gap-fix-wrapper">
                <div class="sbb-gap-fix-corner" id="right"></div>
              </div>
            </div>
            <div class="sbb-select__panel">
              <div class="sbb-select__wrapper">
                <div id="sbb-select-2" class="sbb-select__options" role="listbox" aria-multiselectable="">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-option value="1">Option 1</sbb-option>
        <sbb-option value="2">Option 2</sbb-option>
        <sbb-option value="3">Option 3</sbb-option>
      </sbb-select>
    `);
  });
});
