import { SbbToggleOption } from './sbb-toggle-option';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-option', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleOption],
      html: '<sbb-toggle-option checked />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle-option aria-checked="true" aria-labelledby="sbb-toggle-option-1" checked="">
          <mock:shadow-root>
            <input aria-hidden="true" checked id="sbb-toggle-option-1" tabindex="-1" type="radio">
            <span class="sbb-toggle-option">
            <label htmlfor="sbb-toggle-option-1" id="sbb-toggle-option-1"></label>
            </span>
          </mock:shadow-root>
        </sbb-toggle-option>
      `);
  });
});
