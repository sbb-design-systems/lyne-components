import { SbbToggleOption } from './sbb-toggle-option';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-option', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleOption],
      html: '<sbb-toggle-option checked value="Option 1" />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle-option aria-checked="true" aria-labelledby="sbb-toggle-option-1" checked="" value="Option 1">
          <mock:shadow-root>
            <input aria-hidden="true" checked id="sbb-toggle-option-1" tabindex="-1" type="radio" value="Option 1">
            <span class="sbb-toggle-option">
              <label htmlfor="sbb-toggle-option-1" id="sbb-toggle-option-1">Option 1</label>
            </span>
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
        <sbb-toggle-option aria-checked="true" aria-labelledby="sbb-toggle-option-2" checked="" icon-name="arrow-right-small">
          <mock:shadow-root>
            <input aria-hidden="true" checked id="sbb-toggle-option-2" tabindex="-1" type="radio">
            <span class="sbb-toggle-option">
              <slot name="icon">
                <sbb-icon name="arrow-right-small"></sbb-icon>
              </slot>
            </span>
          </mock:shadow-root>
        </sbb-toggle-option>
      `);
  });

  it('renders with sbb-icon and label', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleOption],
      html: '<sbb-toggle-option checked icon-name="arrow-right-small" value="Option 1" />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle-option aria-checked="true" aria-labelledby="sbb-toggle-option-3" checked="" icon-name="arrow-right-small" value="Option 1">
          <mock:shadow-root>
            <input aria-hidden="true" checked id="sbb-toggle-option-3" tabindex="-1" type="radio" value="Option 1">
            <span class="sbb-toggle-option">
              <slot name="icon">
                <sbb-icon name="arrow-right-small"></sbb-icon>
              </slot>
              <label htmlfor="sbb-toggle-option-3" id="sbb-toggle-option-3">Option 1</label>
            </span>
          </mock:shadow-root>
        </sbb-toggle-option>
      `);
  });
});
