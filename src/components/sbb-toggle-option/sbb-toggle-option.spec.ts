import { SbbToggleOption } from './sbb-toggle-option';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-option', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleOption],
      html: '<sbb-toggle-option checked value="Option 1" />',
    });

    expect(root).toEqualHtml(`
      <sbb-toggle-option aria-checked="true" checked="" role="radio" value="Option 1">
        <mock:shadow-root>
          <input aria-hidden="true" checked id="sbb-toggle-option-1" tabindex="-1" type="radio" value="Option 1">
          <label class="sbb-toggle-option" htmlfor="sbb-toggle-option-1">
            <span class="sbb-toggle-option__label">
              <slot></slot>
            </span>
          </label>
        </mock:shadow-root>
      </sbb-toggle-option>
    `);
  });

  it('renders with sbb-icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleOption],
      html: '<sbb-toggle-option checked icon-name="arrow-right-small" />',
    });

    expect(root).toEqualHtml(`
      <sbb-toggle-option aria-checked="true" checked="" icon-name="arrow-right-small" role="radio">
        <mock:shadow-root>
          <input aria-hidden="true" checked id="sbb-toggle-option-2" tabindex="-1" type="radio">
          <label class="sbb-toggle-option sbb-toggle-option--icon-only" htmlfor="sbb-toggle-option-2">
            <slot name="icon">
              <sbb-icon name="arrow-right-small"></sbb-icon>
            </slot>
            <span class="sbb-toggle-option__label">
              <slot></slot>
            </span>
          </label>
        </mock:shadow-root>
      </sbb-toggle-option>
    `);
  });
});
