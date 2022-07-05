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
        <sbb-form-field label="Fill input">
          <mock:shadow-root>
            <div class="input-wrapper">
              <label class="input-label">
                <slot name="label">
                  <span>
                    Fill input
                  </span>
                </slot>
              </label>
              <div>
                <slot name="prefix"></slot>
              </div>
              <div>
                <slot name="input"></slot>
              </div>
              <div>
                <slot name="suffix"></slot>
              </div>
              <div>
                <slot name="error"></slot>
              </div>
            </div>
          </mock:shadow-root>
          <input slot='input' class='input' placeholder='This is an input' />
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
        <sbb-form-field label="Fill input">
          <mock:shadow-root>
            <div class="input-wrapper form--disabled">
              <label class="input-label">
                <slot name="label">
                  <span>
                    Fill input
                  </span>
                </slot>
              </label>
              <div>
                <slot name="prefix"></slot>
              </div>
              <div>
                <slot name="input"></slot>
              </div>
              <div>
                <slot name="suffix"></slot>
              </div>
              <div>
                <slot name="error"></slot>
              </div>
            </div>
          </mock:shadow-root>
          <input slot='input' class='input' disabled placeholder='This is an input' />
        </sbb-form-field>
      `);
  });

  it('renders readonly input with error', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField],
      html: `
        <sbb-form-field label="Fill input">
          <input slot='input' class='input' readonly placeholder='This is an input' />
          <sbb-form-error id="error" slot="error">
            You can't change this value.
          </sbb-form-error>
        </sbb-form-field>`,
    });

    expect(root).toEqualHtml(`
        <sbb-form-field label="Fill input">
          <mock:shadow-root>
            <div class="input-wrapper form--readonly">
              <label class="input-label">
                <slot name="label">
                  <span>
                    Fill input
                  </span>
                </slot>
              </label>
              <div>
                <slot name="prefix"></slot>
              </div>
              <div>
                <slot name="input"></slot>
              </div>
              <div>
                <slot name="suffix"></slot>
              </div>
              <div>
                <slot name="error"></slot>
              </div>
            </div>
          </mock:shadow-root>
          <input slot='input' class='input' readonly placeholder='This is an input' aria-describedby="error"/>
          <sbb-form-error id="error" slot="error">
            You can't change this value.
          </sbb-form-error>
        </sbb-form-field>
      `);
  });
});
