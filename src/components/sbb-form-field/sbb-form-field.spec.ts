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
      <sbb-form-field class="form-field--error-space-default form-field--size-m" label="Fill input">
        <mock:shadow-root>
          <div class="form-field__space-wrapper">
            <div class="form-field__wrapper">
               <slot name="prefix"></slot>
              <div class="form-field__input-container">
                <label class="form-field__label">
                  <slot name="label">
                    <span>
                      Fill input
                    </span>
                  </slot>
                </label>
                <div class="form-field__input">
                  <slot></slot>
                </div>
              </div>
               <slot name="suffix"></slot>
            </div>
            <div class="form-field__error form-field__error--empty">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
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
      <sbb-form-field class="form-field--error-space-default form-field--size-m" label="Fill input">
        <mock:shadow-root>
          <div class="form-field__space-wrapper">
            <div class="form-field__wrapper">
              <slot name="prefix"></slot>
              <div class="form-field__input-container">
                <label class="form-field__label">
                  <slot name="label">
                    <span>
                      Fill input
                    </span>
                  </slot>
                </label>
                <div class="form-field__input">
                  <slot></slot>
                </div>
              </div>
               <slot name="suffix"></slot>
            </div>
            <div class="form-field__error form-field__error--empty">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
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
          <sbb-form-error id="error" slot="error">
            You can't change this value.
          </sbb-form-error>
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field class="form-field--error-space-default form-field--size-m" label="Fill input">
        <mock:shadow-root>
          <div class="form-field__space-wrapper">
            <div class="form-field__wrapper">
              <slot name="prefix"></slot>
              <div class="form-field__input-container">
                <label class="form-field__label">
                  <slot name="label">
                    <span>
                      Fill input
                    </span>
                  </slot>
                </label>
                <div class="form-field__input">
                  <slot></slot>
                </div>
              </div>
               <slot name="suffix"></slot>
            </div>
            <div class="form-field__error form-field__error--empty">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <input aria-describedby="error" class="input" placeholder="This is an input" readonly="" slot="input">
        <sbb-form-error id="error" slot="error">
          You can't change this value.
        </sbb-form-error>
      </sbb-form-field>
    `);
  });

  it('should renders select without label', async () => {
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
      <sbb-form-field class="form-field--error-space-default form-field--size-m">
        <mock:shadow-root>
          <div class="form-field__space-wrapper">
            <div class="form-field__wrapper">
              <slot name="prefix"></slot>
              <div class="form-field__input-container">
                <div class="form-field__input">
                  <slot></slot>
                </div>
              </div>
               <slot name="suffix"></slot>
            </div>
            <div class="form-field__error form-field__error--empty">
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
        <sbb-form-field label="Select option:" optional="true" borderless="true" >
          <select>
            <option>Value 1</option>
            <option>Value 2</option>
            <option>Value 3</option>
          </select>
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
      <sbb-form-field class="form-field--error-space-default form-field--size-m form-field--borderless" label="Select option:" optional="true" borderless="true" >
        <mock:shadow-root>
          <div class="form-field__space-wrapper">
            <div class="form-field__wrapper">
              <slot name="prefix"></slot>
              <div class="form-field__input-container">
                <label class="form-field__label">
                  <slot name="label">
                    <span>
                      Select option:
                    </span>
                  </slot>
                  <span aria-hidden="true">&nbsp;(optional)</span>
                </label>
                <div class="form-field__input">
                  <slot></slot>
                </div>
              </div>
               <slot name="suffix"></slot>
            </div>
            <div class="form-field__error form-field__error--empty">
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
});
