import { newSpecPage } from '@stencil/core/testing';
import { SbbCheckbox } from './sbb-checkbox';

describe('sbb-checkbox', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCheckbox],
      html: '<sbb-checkbox>Label</sbb-checkox>',
    });

    expect(root).toEqualHtml(`
      <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-placement="end" role="checkbox" size="m" tabindex="0">
        <mock:shadow-root>
          <span class="sbb-checkbox-wrapper">
            <label class="sbb-checkbox">
              <input aria-hidden="true" tabindex="-1" type="checkbox"/>
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__aligner">
                  <sbb-visual-checkbox></sbb-visual-checkbox>
                </span>
                <span class="sbb-checkbox__label">
                  <slot></slot>
                </span>
              </span>
            </label>
          </span>
        </mock:shadow-root>
        Label
      </sbb-checkbox>
    `);
  });

  describe('icon position', () => {
    it('start', async () => {
      const { root } = await newSpecPage({
        components: [SbbCheckbox],
        html: '<sbb-checkbox icon-name="tickets-class-small" icon-placement="start" size="s">Label</sbb-checkox>',
      });

      expect(root).toEqualHtml(`
        <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-name="tickets-class-small" icon-placement="start" role="checkbox" size="s" tabindex="0">
          <mock:shadow-root>
            <span class="sbb-checkbox-wrapper">
              <label class="sbb-checkbox">
                <input aria-hidden="true" tabindex="-1" type="checkbox"/>
                <span class="sbb-checkbox__inner">
                  <span class="sbb-checkbox__aligner">
                    <sbb-visual-checkbox></sbb-visual-checkbox>
                  </span>
                  <span class="sbb-checkbox__label">
                    <slot></slot>
                    <span class="sbb-checkbox__label--icon">
                      <slot name="icon">
                        <sbb-icon name="tickets-class-small"></sbb-icon>
                      </slot>
                    </span>
                  </span>
                </span>
              </label>
            </span>
          </mock:shadow-root>
          Label
        </sbb-checkbox>
      `);
    });
  });

  describe('state', () => {
    it('checked', async () => {
      const { root } = await newSpecPage({
        components: [SbbCheckbox],
        html: '<sbb-checkbox checked="true">Label</sbb-checkbox>',
      });

      expect(root).toEqualHtml(`
        <sbb-checkbox aria-checked="true" aria-disabled="false" aria-required="false" checked icon-placement="end" role="checkbox" size="m" tabindex="0">
          <mock:shadow-root>
            <span class="sbb-checkbox-wrapper">
              <label class="sbb-checkbox">
                <input aria-hidden="true" checked tabindex="-1" type="checkbox"/>
                <span class="sbb-checkbox__inner">
                  <span class="sbb-checkbox__aligner">
                    <sbb-visual-checkbox checked=""></sbb-visual-checkbox>
                  </span>
                  <span class="sbb-checkbox__label">
                    <slot></slot>
                  </span>
                </span>
              </label>
            </span>
          </mock:shadow-root>
          Label
        </sbb-checkbox>
      `);
    });

    it('indeterminate', async () => {
      const { root } = await newSpecPage({
        components: [SbbCheckbox],
        html: '<sbb-checkbox indeterminate>Label</sbb-checkbox>',
      });

      const input = root.shadowRoot.querySelector('input');
      expect(input.indeterminate).toBe(true);

      expect(root).toEqualHtml(`
        <sbb-checkbox aria-checked="mixed" aria-disabled="false" aria-required="false" icon-placement="end" indeterminate role="checkbox" size="m" tabindex="0">
          <mock:shadow-root>
            <span class="sbb-checkbox-wrapper">
              <label class="sbb-checkbox">
                <input aria-hidden="true" tabindex="-1" type="checkbox">
                <span class="sbb-checkbox__inner">
                  <span class="sbb-checkbox__aligner">
                    <sbb-visual-checkbox indeterminate=""></sbb-visual-checkbox>
                  </span>
                  <span class="sbb-checkbox__label">
                    <slot></slot>
                  </span>
                </span>
              </label>
            </span>
          </mock:shadow-root>
          Label
        </sbb-checkbox>`);
    });

    it('unchecked disabled', async () => {
      const { root } = await newSpecPage({
        components: [SbbCheckbox],
        html: '<sbb-checkbox disabled>Label</sbb-checkox>',
      });
      expect(root).toEqualHtml(`
        <sbb-checkbox aria-checked="false" aria-disabled="true" aria-required="false" disabled icon-placement="end" size="m" role="checkbox">
          <mock:shadow-root>
            <span class="sbb-checkbox-wrapper">
              <label class="sbb-checkbox">
                <input disabled aria-hidden="true" tabindex="-1" type="checkbox"/>
                <span class="sbb-checkbox__inner">
                  <span class="sbb-checkbox__aligner">
                    <sbb-visual-checkbox disabled=""></sbb-visual-checkbox>
                  </span>
                  <span class="sbb-checkbox__label">
                    <slot></slot>
                  </span>
                </span>
              </label>
            </span>
          </mock:shadow-root>
          Label
        </sbb-checkbox>
      `);
    });
  });
});
