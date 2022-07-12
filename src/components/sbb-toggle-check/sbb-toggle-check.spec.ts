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
            <label class="toggle-check" htmlfor="sbb-checkbox-1">
              <input id="sbb-checkbox-1" type="checkbox"/>
              <span class="toggle-check__slider toggle-check__slider--after">
                <span class="toggle-check__circle"></span>
              </span>
              <slot></slot>
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
            <label class="toggle-check" htmlfor="sbb-checkbox-2">
              <input id="sbb-checkbox-2" type="checkbox"/>
              <slot></slot>
              <span class="toggle-check__slider toggle-check__slider--before">
                <span class="toggle-check__circle"></span>
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
              <label class="toggle-check toggle-check--checked" htmlfor="sbb-checkbox-3">
                <input checked="" id="sbb-checkbox-3" type="checkbox"/>
                <span class="toggle-check__slider toggle-check__slider--after">
                  <span class="toggle-check__circle">
                    <span class="toggle-check__tick">
                      <slot name="icon">
                        <svg height="36" viewBox="0,0,36,36" width="36" xmlns="http://www.w3.org/2000/svg">
                          <path clip-rule="evenodd" d="m28.8534,10.8683-13.5,13.485-.3536.3532-.3533-.3534-6.00002-6,.70711-.7071,5.64661,5.6467,13.1465-13.1319.7067.7075z" fill-rule="evenodd"></path>
                        </svg>
                      </slot>
                    </span>
                  </span>
                </span>
                <slot></slot>
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
              <label class="toggle-check toggle-check--disabled" htmlfor="sbb-checkbox-4">
                <input disabled="" id="sbb-checkbox-4" type="checkbox">
                <span class="toggle-check__slider toggle-check__slider--after">
                  <span class="toggle-check__circle"></span>
                </span>
                <slot></slot>
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
              <label class="toggle-check toggle-check--disabled toggle-check--checked" htmlfor="sbb-checkbox-5">
                <input checked="" type="checkbox" disabled id="sbb-checkbox-5"/>
                <span class="toggle-check__slider toggle-check__slider--after">
                  <span class="toggle-check__circle">
                    <span class="toggle-check__tick">
                      <slot name="icon">
                        <svg height="36" viewBox="0,0,36,36" width="36" xmlns="http://www.w3.org/2000/svg">
                          <path clip-rule="evenodd" d="m28.8534,10.8683-13.5,13.485-.3536.3532-.3533-.3534-6.00002-6,.70711-.7071,5.64661,5.6467,13.1465-13.1319.7067.7075z" fill-rule="evenodd"></path>
                        </svg>
                      </slot>
                    </span>
                  </span>
                </span>
                <slot></slot>
              </label>
            </mock:shadow-root>
          </sbb-toggle-check>
        `);
      });
    });
  });
});
