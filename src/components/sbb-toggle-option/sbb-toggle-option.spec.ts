import { SbbToggleOption } from './sbb-toggle-option';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-option', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleOption],
      html: '<sbb-toggle-option />',
    });

    expect(root).toEqualHtml(`
    <sbb-toggle-option aria-checked="false">
          <mock:shadow-root>
            <input aria-hidden="true" id="sbb-toggle-option-1" tabindex="-1" type="radio">
            <span class="sbb-toggle-option">
            <label htmlfor="sbb-toggle-option-1" id="sbb-toggle-option-1"></label>
            </span>
          </mock:shadow-root>
        </sbb-toggle-option>
      `);
  });
});
