import { SbbOptionGroup } from './sbb-option-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-option-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbOptionGroup],
      html: `
        <sbb-option-group label="Label">
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-option-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-option-group label="Label">
        <mock:shadow-root>
          <div class="sbb-option-group">
            <div class="sbb-option-group__label">Label</div>
            <div class="sbb-option-group__options">
              <slot></slot>
            </div>
            <div class="sbb-option-group__divider">
              <sbb-divider></sbb-divider>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-option value="1">1</sbb-option>
        <sbb-option value="2">2</sbb-option>
      </sbb-option-group>
    `);
  });
});
