import { SbbOptGroup } from './sbb-optgroup';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-optgroup', () => {
  describe('autocomplete', function () {
    it('renders', async () => {
      const { root } = await newSpecPage({
        components: [SbbOptGroup],
        html: `
          <sbb-autocomplete>
            <sbb-optgroup label="Label">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
          `,
      });

      expect(root).toEqualHtml(`
        <sbb-optgroup aria-disabled="false" aria-label="Label" data-variant="autocomplete" label="Label" role="group">
          <mock:shadow-root>
            <div class="sbb-optgroup__divider">
              <sbb-divider></sbb-divider>
            </div>
            <span aria-hidden="true" class="sbb-optgroup__label">Label</span>
            <slot></slot>
          </mock:shadow-root>
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-optgroup>
      `);
    });

    it('renders disabled', async () => {
      const { root } = await newSpecPage({
        components: [SbbOptGroup],
        html: `
          <sbb-autocomplete>
            <sbb-optgroup label="Label" disabled="true">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
        `,
      });

      expect(root).toEqualHtml(`
        <sbb-optgroup disabled="true" aria-disabled="true" aria-label="Label" data-variant="autocomplete" label="Label" role="group">
          <mock:shadow-root>
            <div class="sbb-optgroup__divider">
              <sbb-divider></sbb-divider>
            </div>
            <span aria-hidden="true" class="sbb-optgroup__label">Label</span>
            <slot></slot>
          </mock:shadow-root>
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-optgroup>
      `);
    });
  });
});
