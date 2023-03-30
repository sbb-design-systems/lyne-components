import { SbbOptionGroup } from './sbb-option-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-option-group', () => {
  describe('autocomplete', function () {
    it('renders', async () => {
      const { root } = await newSpecPage({
        components: [SbbOptionGroup],
        html: `
          <sbb-autocomplete>
            <sbb-option-group label="Label">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-option-group>
          </sbb-autocomplete>
          `,
      });

      expect(root).toEqualHtml(`
        <sbb-option-group aria-disabled="false" aria-label="Label" data-variant="autocomplete" label="Label" role="group">
          <mock:shadow-root>
            <div class="sbb-option-group__divider">
              <sbb-divider></sbb-divider>
            </div>
            <span aria-hidden="true" class="sbb-option-group__label">Label</span>
            <slot></slot>
          </mock:shadow-root>
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-option-group>
      `);
    });

    it('renders disabled', async () => {
      const { root } = await newSpecPage({
        components: [SbbOptionGroup],
        html: `
          <sbb-autocomplete>
            <sbb-option-group label="Label" disabled="true">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-option-group>
          </sbb-autocomplete>
        `,
      });

      expect(root).toEqualHtml(`
        <sbb-option-group disabled="true" aria-disabled="true" aria-label="Label" data-variant="autocomplete" label="Label" role="group">
          <mock:shadow-root>
            <div class="sbb-option-group__divider">
              <sbb-divider></sbb-divider>
            </div>
            <span aria-hidden="true" class="sbb-option-group__label">Label</span>
            <slot></slot>
          </mock:shadow-root>
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-option-group>
      `);
    });
  });
});
