import { SbbToggleCheck } from './sbb-toggle-check';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-check', () => {
  it('renders sbb-toggle-check', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleCheck],
      html: '<sbb-toggle-check></sbb-toggle-check>',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle-check>
          <mock:shadow-root>
            <label class="toggle-check toggle-check--after" htmlfor="sbb-toggle-checkbox-1">
              <input id="sbb-toggle-checkbox-1" type="checkbox"/>
              <span class="toggle-check__container">
                <slot></slot>
                <span class="toggle-check__slider">
                  <span class="toggle-check__circle">
                    <slot name="icon">
                      <sbb-icon name="tick-small"></sbb-icon>
                    </slot>
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
        html: '<sbb-toggle-check label-position="before"></sbb-toggle-check>',
      });

      expect(root).toEqualHtml(`
        <sbb-toggle-check label-position="before">
          <mock:shadow-root>
            <label class="toggle-check toggle-check--before" htmlfor="sbb-toggle-checkbox-2">
              <input id="sbb-toggle-checkbox-2" type="checkbox"/>
              <span class="toggle-check__container">
                <slot></slot>
                <span class="toggle-check__slider">
                  <span class="toggle-check__circle">
                    <slot name="icon">
                      <sbb-icon name="tick-small"></sbb-icon>
                    </slot>
                  </span>
                </span>
              </span>
            </label>
          </mock:shadow-root>
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
          <sbb-toggle-check checked>
            <mock:shadow-root>
              <label class="toggle-check toggle-check--after toggle-check--checked" htmlfor="sbb-toggle-checkbox-3">
                <input checked="" id="sbb-toggle-checkbox-3" type="checkbox"/>
                <span class="toggle-check__container">
                  <slot></slot>
                  <span class="toggle-check__slider">
                    <span class="toggle-check__circle">
                      <slot name="icon">
                        <sbb-icon name="tick-small"></sbb-icon>
                      </slot>
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
          <sbb-toggle-check disabled>
            <mock:shadow-root>
              <label class="toggle-check toggle-check--after toggle-check--disabled" htmlfor="sbb-toggle-checkbox-4">
                <input disabled="" id="sbb-toggle-checkbox-4" type="checkbox">
                 <span class="toggle-check__container">
                  <slot></slot>
                  <span class="toggle-check__slider">
                    <span class="toggle-check__circle">
                     <slot name="icon">
                       <sbb-icon name="tick-small"></sbb-icon>
                     </slot>
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
          <sbb-toggle-check checked disabled>
            <mock:shadow-root>
              <label class="toggle-check toggle-check--after toggle-check--checked toggle-check--disabled" htmlfor="sbb-toggle-checkbox-5">
                <input checked="" type="checkbox" disabled id="sbb-toggle-checkbox-5"/>
                <span class="toggle-check__container">
                  <slot></slot>
                  <span class="toggle-check__slider">
                    <span class="toggle-check__circle">
                      <slot name="icon">
                        <sbb-icon name="tick-small"></sbb-icon>
                      </slot>
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
