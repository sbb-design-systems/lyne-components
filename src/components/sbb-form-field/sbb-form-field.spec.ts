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
      <sbb-form-field class="form-field--error-space-default form-field--size-l" label="Fill input">
        <mock:shadow-root>
          <div class="form-field__wrapper">
            <div class="form-field__prefix form-field__prefix--empty">
              <slot name="prefix"></slot>
            </div>
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
            <div class="form-field__suffix form-field__suffix--empty">
              <slot name="suffix"></slot>
            </div>
          </div>
          <div class="form-field__error form-field__error--empty">
            <slot name="error"></slot>
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
      <sbb-form-field class="form-field--error-space-default form-field--size-l" label="Fill input">
        <mock:shadow-root>
          <div class="form-field__wrapper">
            <div class="form-field__prefix form-field__prefix--empty">
              <slot name="prefix"></slot>
            </div>
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
            <div class="form-field__suffix form-field__suffix--empty">
              <slot name="suffix"></slot>
            </div>
          </div>
          <div class="form-field__error form-field__error--empty">
            <slot name="error"></slot>
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
      <sbb-form-field class="form-field--error-space-default form-field--size-l" label="Fill input">
        <mock:shadow-root>
          <div class="form-field__wrapper">
            <div class="form-field__prefix form-field__prefix--empty">
              <slot name="prefix"></slot>
            </div>
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
            <div class="form-field__suffix form-field__suffix--empty">
              <slot name="suffix"></slot>
            </div>
          </div>
          <div class="form-field__error form-field__error--empty">
            <slot name="error"></slot>
          </div>
        </mock:shadow-root>
        <input aria-describedby="error" class="input" placeholder="This is an input" readonly="" slot="input">
        <sbb-form-error id="error" slot="error">
          You can't change this value.
        </sbb-form-error>
      </sbb-form-field>
    `);
  });
});
