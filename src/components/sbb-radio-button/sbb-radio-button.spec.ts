import { SbbRadioButton } from './sbb-radio-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-radio-button', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbRadioButton],
      html: '<sbb-radio-button />',
    });

    expect(root).toEqualHtml(`
        <sbb-radio-button aria-checked="false" aria-disabled="false" aria-required="false" size="m" role="radio">
          <mock:shadow-root>
            <label class="sbb-radio-button">
              <input aria-hidden="true" class="sbb-radio-button__input" tabindex="-1" type="radio">
              <span class="sbb-radio-button__label-slot">
                <slot></slot>
              </span>
            </label>
          </mock:shadow-root>
        </sbb-radio-button>
      `);
  });
});
