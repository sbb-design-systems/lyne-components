import { SbbRadioButton } from './sbb-radio-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-radio-button', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbRadioButton],
      html: '<sbb-radio-button />',
    });

    expect(root).toEqualHtml(`
        <sbb-radio-button aria-checked="false" aria-labelledby="sbb-radio-button-label-1" size="m" role="radio">
          <mock:shadow-root>
          <label htmlfor="sbb-radio-button-2" id="sbb-radio-button-label-1">
            <input aria-hidden="true" id="sbb-radio-button-2" tabindex="-1" type="radio">
            <span>
              <slot></slot>
            </span>
          </label>
          </mock:shadow-root>
        </sbb-radio-button>
      `);
  });
});
