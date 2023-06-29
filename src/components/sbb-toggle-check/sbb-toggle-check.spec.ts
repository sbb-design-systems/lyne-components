import { SbbToggleCheck } from './sbb-toggle-check';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-check', () => {
  it('renders sbb-toggle-check', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleCheck],
      html: '<sbb-toggle-check></sbb-toggle-check>',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle-check size="s" aria-checked="false" aria-disabled="false" aria-required="false" label-position="after" role="checkbox" tabindex="0">
          <mock:shadow-root>
            <label class="sbb-toggle-check">
              <input aria-hidden="true" tabindex="-1" type="checkbox"/>
              <span class="sbb-toggle-check__container">
                <span class="sbb-toggle-check__label" hidden="">
                  <slot></slot>
                </span>
                <span class="sbb-toggle-check__track">
                  <span class="sbb-toggle-check__circle">
                    <span class="sbb-toggle-check__icon">
                      <slot name="icon">
                        <sbb-icon name="tick-small"></sbb-icon>
                      </slot>
                    </span>
                  </span>
                </span>
              </span>
            </label>
          </mock:shadow-root>
        </sbb-toggle-check>
      `);
  });

  describe('label position', () => {
    it('renders label before toggle', async () => {
      const { root } = await newSpecPage({
        components: [SbbToggleCheck],
        html: `
          <sbb-toggle-check label-position="before">Check it</sbb-toggle-check>
        `,
      });

      expect(root).toEqualHtml(`
        <sbb-toggle-check size="s" aria-checked="false" aria-disabled="false" aria-required="false" label-position="before" role="checkbox" tabindex="0">
          <mock:shadow-root>
            <label class="sbb-toggle-check">
              <input aria-hidden="true" tabindex="-1" type="checkbox"/>
              <span class="sbb-toggle-check__container">
                <span class="sbb-toggle-check__label">
                  <slot></slot>
                </span>
                <span class="sbb-toggle-check__track">
                <span class="sbb-toggle-check__circle">
                  <span class="sbb-toggle-check__icon">
                    <slot name="icon">
                      <sbb-icon name="tick-small"></sbb-icon>
                    </slot>
                  </span>
                </span>
              </span>
            </label>
          </mock:shadow-root>
          Check it
        </sbb-toggle-check>
      `);
    });
  });

  describe('states', () => {
    describe('checked state', () => {
      it('renders toggle in checked state', async () => {
        const { root } = await newSpecPage({
          components: [SbbToggleCheck],
          html: '<sbb-toggle-check checked></sbb-toggle-check>',
        });

        expect(root).toEqualHtml(`
          <sbb-toggle-check size="s" aria-checked="true" aria-disabled="false" aria-required="false" checked label-position="after" role="checkbox" tabindex="0">
            <mock:shadow-root>
              <label class="sbb-toggle-check">
                <input aria-hidden="true" checked="" tabindex="-1" checked="" type="checkbox"/>
                <span class="sbb-toggle-check__container">
                  <span class="sbb-toggle-check__label" hidden="">
                    <slot></slot>
                  </span>
                  <span class="sbb-toggle-check__track">
                    <span class="sbb-toggle-check__circle">
                      <span class="sbb-toggle-check__icon">
                        <slot name="icon">
                          <sbb-icon name="tick-small"></sbb-icon>
                        </slot>
                      </span>
                    </span>
                  </span>
                </span>
              </label>
            </mock:shadow-root>
          </sbb-toggle-check>
        `);
      });
    });

    describe('disabled state', () => {
      it('renders toggle in disabled state', async () => {
        const { root } = await newSpecPage({
          components: [SbbToggleCheck],
          html: '<sbb-toggle-check disabled></sbb-toggle-check>',
        });

        expect(root).toEqualHtml(`
          <sbb-toggle-check size="s" aria-checked="false" aria-disabled="true" aria-required="false" disabled label-position="after" role="checkbox">
            <mock:shadow-root>
              <label class="sbb-toggle-check">
                <input disabled aria-hidden="true" tabindex="-1" type="checkbox">
                <span class="sbb-toggle-check__container">
                  <span class="sbb-toggle-check__label" hidden="">
                    <slot></slot>
                  </span>
                  <span class="sbb-toggle-check__track">
                    <span class="sbb-toggle-check__circle">
                      <span class="sbb-toggle-check__icon">
                        <slot name="icon">
                          <sbb-icon name="tick-small"></sbb-icon>
                        </slot>
                      </span>
                    </span>
                  </span>
                </span>
              </label>
            </mock:shadow-root>
          </sbb-toggle-check>
        `);
      });
    });

    describe('disabled and checked state', () => {
      it('renders toggle in disabled and checked state', async () => {
        const { root } = await newSpecPage({
          components: [SbbToggleCheck],
          html: '<sbb-toggle-check checked disabled></sbb-toggle-check>',
        });

        expect(root).toEqualHtml(`
          <sbb-toggle-check checked disabled size="s" label-position="after" aria-checked="true" aria-disabled="true" aria-required="false" role="checkbox">
            <mock:shadow-root>
              <label class="sbb-toggle-check">
                <input checked="" type="checkbox" disabled aria-hidden="true" tabindex="-1" />
                <span class="sbb-toggle-check__container">
                  <span class="sbb-toggle-check__label" hidden="">
                    <slot></slot>
                  </span>
                  <span class="sbb-toggle-check__track">
                    <span class="sbb-toggle-check__circle">
                      <span class="sbb-toggle-check__icon">
                        <slot name="icon">
                          <sbb-icon name="tick-small"></sbb-icon>
                        </slot>
                      </span>
                    </span>
                  </span>
                </span>
              </label>
            </mock:shadow-root>
          </sbb-toggle-check>
        `);
      });
    });
  });
});
