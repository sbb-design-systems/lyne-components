// FIXME slotchange is not triggered, see https://github.com/ionic-team/stencil/issues/3536
import { newSpecPage } from '@stencil/core/testing';
import { SbbFormField } from './sbb-form-field';

describe('sbb-form-field', () => {
  it('renders input', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
        <sbb-form-field label="Fill input">
          <input slot='input' class='input' placeholder='This is an input' />
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" size="m" label="Fill input" width="default">
        <mock:shadow-root>
          <div class="sbb-form-field__space-wrapper">
            <div class="sbb-form-field__wrapper" id="form-field-wrapper">
              <slot name="prefix"></slot>
              <div class="sbb-form-field__input-container">
                <span class="sbb-form-field__label">
                  <slot name="label"></slot>
                </span>
                <div class="sbb-form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div class="sbb-form-field__error" aria-live="polite">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Fill input
        </label>
        <input class="input" placeholder="This is an input" slot="input">
      </sbb-form-field>
    `);
  });

  // TODO: Enable once onSlotchange is fixed https://github.com/ionic-team/stencil/issues/3536
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders slotted label', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
        <sbb-form-field>
          <span slot="label">Fill input</span>
          <input slot='input' class='input' placeholder='This is an input' />
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" size="m" width="default">
        <mock:shadow-root>
          <div class="sbb-form-field__space-wrapper">
            <div class="sbb-form-field__wrapper" id="form-field-wrapper">
              <slot name="prefix"></slot>
              <div class="sbb-form-field__input-container">
                <label class="sbb-form-field__label">
                  <slot name="label">
                    <span></span>
                  </slot>
                </label>
                <div class="sbb-form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div class="sbb-form-field__error" aria-live="polite">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <span>
          Fill input
        </span>
        <input class="input" placeholder="This is an input" slot="input">
      </sbb-form-field>
    `);
  });

  it('renders disabled input', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
      <sbb-form-field label="Fill input">
        <input slot='input' class='input' disabled placeholder='This is an input' />
      </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" size="m" label="Fill input" width="default">
        <mock:shadow-root>
          <div class="sbb-form-field__space-wrapper">
            <div class="sbb-form-field__wrapper" id="form-field-wrapper">
              <slot name="prefix"></slot>
              <div class="sbb-form-field__input-container">
                <span class="sbb-form-field__label">
                  <slot name="label"></slot>
                </span>
                <div class="sbb-form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div class="sbb-form-field__error" aria-live="polite">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Fill input
        </label>
        <input class="input" disabled="" placeholder="This is an input" slot="input">
      </sbb-form-field>
    `);
  });

  it('renders readonly input with error', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
        <sbb-form-field label="Fill input">
        <input aria-describedby="error" class="input" readonly placeholder="This is an input" slot="input">
          <sbb-form-error id="error">
            You can't change this value.
          </sbb-form-error>
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" size="m" label="Fill input" width="default">
        <mock:shadow-root>
          <div class="sbb-form-field__space-wrapper">
            <div class="sbb-form-field__wrapper" id="form-field-wrapper">
              <slot name="prefix"></slot>
              <div class="sbb-form-field__input-container">
                <span class="sbb-form-field__label">
                  <slot name="label"></slot>
                </span>
                <div class="sbb-form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div class="sbb-form-field__error" aria-live="polite">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Fill input
        </label>
        <input aria-describedby="error" class="input" placeholder="This is an input" readonly="" slot="input">
        <sbb-form-error id="error">
          You can't change this value.
        </sbb-form-error>
      </sbb-form-field>
    `);
  });

  it('should render select without label', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
        <sbb-form-field>
          <select>
            <option>Value 1</option>
            <option>Value 2</option>
            <option>Value 3</option>
          </select>
        </sbb-form-field>`,
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
            <div class="sbb-form-field__error" aria-live="polite">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <select>
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
      </sbb-form-field>
    `);
  });

  it('renders select with optional flag and borderless', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
        <sbb-form-field label="Select option:" optional="true" borderless="" >
          <select>
            <option>Value 1</option>
            <option>Value 2</option>
            <option>Value 3</option>
          </select>
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field error-space="none" size="m" label="Select option:" optional="true" borderless="" width="default">
        <mock:shadow-root>
          <div class="sbb-form-field__space-wrapper">
            <div class="sbb-form-field__wrapper" id="form-field-wrapper">
              <slot name="prefix"></slot>
              <div class="sbb-form-field__input-container">
                <span class="sbb-form-field__label">
                  <slot name="label"></slot>
                  <span aria-hidden="true">&nbsp;(optional)</span>
                </span>
                <div class="sbb-form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div class="sbb-form-field__error" aria-live="polite">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Select option:
        </label>
        <select>
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
      </sbb-form-field>
    `);
  });
});
