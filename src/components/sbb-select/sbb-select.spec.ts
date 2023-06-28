import { SbbSelect } from './sbb-select';
import { newSpecPage } from '@stencil/core/testing';
import { SbbOption } from '../sbb-option/sbb-option';

// NOTE: it needs to load also the SbbOption component, otherwise the value is not correctly read as a component's attribute.
describe('sbb-select', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelect, SbbOption],
      html: `
        <sbb-select>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-option value="2">Option 2</sbb-option>
          <sbb-option value="3">Option 3</sbb-option>
        </sbb-select>
      `,
    });

    expect(root.shadowRoot.host).toEqualAttribute('dir', 'ltr');
    expect(root.shadowRoot.host).toEqualAttribute('data-state', 'closed');
    expect(root.shadowRoot).toEqualHtml(`
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
    `);
  });

  it('renders multiple', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelect, SbbOption],
      html: `
        <sbb-select multiple>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-option value="2">Option 2</sbb-option>
          <sbb-option value="3">Option 3</sbb-option>
        </sbb-select>
      `,
    });

    expect(root.shadowRoot.host).toEqualAttribute('dir', 'ltr');
    expect(root.shadowRoot.host).toEqualAttribute('data-state', 'closed');
    expect(root.shadowRoot.host).toHaveAttribute('data-multiple');
    expect(root.shadowRoot.host).toHaveAttribute('multiple');
    expect(root.shadowRoot).toEqualHtml(`
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
    `);
  });
});
