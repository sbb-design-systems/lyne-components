import { SbbCheckbox } from './sbb-checkbox';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-checkbox', () => {
  it('renders sbb-checkbox', async () => {
    const { root } = await newSpecPage({
      components: [SbbCheckbox],
      html: '<sbb-checkbox>Label</sbb-checkox>',
    });

    expect(root).toEqualHtml(`
        <sbb-checkbox>
          <mock:shadow-root>
            <label class="sbb-checkbox" htmlfor="sbb-checkbox-1">
              <input id="sbb-checkbox-1" type="checkbox"/>
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__selection">
                  <span class="sbb-checkbox__icon"></span>
                </span>
                <span class="sbb-checkbox__label">
                  <slot></slot>
                  <sbb-icon></sbb-icon>
                </span>
              </span>
            </label>
          </mock:shadow-root>
          Label
        </sbb-checkbox>
      `);
  });

  describe('label position', () => {
    it('renders sbb-checkbox with reversed label', async () => {
      const { root } = await newSpecPage({
        components: [SbbCheckbox],
        html: '<sbb-checkbox icon-name="tickets-class-small" icon-placement="start" >Label</sbb-checkox>',
      });
      expect(root).toEqualHtml(`
          <sbb-checkbox icon-name="tickets-class-small" icon-placement="start">
            <mock:shadow-root>
              <label class="sbb-checkbox" htmlfor="sbb-checkbox-2">
                <input id="sbb-checkbox-2" type="checkbox"/>
                <span class="sbb-checkbox__inner">
                  <span class="sbb-checkbox__selection">
                    <span class="sbb-checkbox__icon"></span>
                  </span>
                  <span class="sbb-checkbox__label sbb-checkbox__label--start">
                    <slot></slot>
                    <sbb-icon name="tickets-class-small"></sbb-icon>
                  </span>
                </span>
              </label>
            </mock:shadow-root>
            Label
          </sbb-checkbox>
        `);
    });
  });

  describe('state', () => {
    describe('checked state', () => {
      it('renders sbb-checkbox in checked state', async () => {
        const { root } = await newSpecPage({
          components: [SbbCheckbox],
          html: '<sbb-checkbox checked>Label</sbb-checkbox>',
        });
        expect(root).toEqualHtml(`
            <sbb-checkbox checked="">
              <mock:shadow-root>
                <label class="sbb-checkbox" htmlfor="sbb-checkbox-3">
                  <input checked="" id="sbb-checkbox-3" type="checkbox"/>
                  <span class="sbb-checkbox__inner">
                    <span class="sbb-checkbox__selection">
                      <span class="sbb-checkbox__icon">
                        <svg fill="none" height="8" viewBox="0 0 10 8" width="10" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.33 3.462 7 9 1" stroke="#EB0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="sbb-checkbox__label">
                      <slot></slot>
                      <sbb-icon></sbb-icon>
                    </span>
                  </span>
                </label>
              </mock:shadow-root>
              Label
            </sbb-checkbox>
          `);
      });
    });

    describe('tristate state', () => {
      it('renders sbb-checkbox in checked state', async () => {
        const { root } = await newSpecPage({
          components: [SbbCheckbox],
          html: '<sbb-checkbox tristated="true">Label</sbb-checkbox>',
        });
        expect(root).toEqualHtml(`
        <sbb-checkbox tristated="true">
          <mock:shadow-root>
            <label class="sbb-checkbox" htmlfor="sbb-checkbox-4">
              <input id="sbb-checkbox-4" type="checkbox">
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__selection">
                  <span class="sbb-checkbox__icon"></span>
                </span>
                <span class="sbb-checkbox__label">
                  <slot></slot>
                  <sbb-icon></sbb-icon>
                </span>
              </span>
            </label>
          </mock:shadow-root>
          Label
        </sbb-checkbox>`);
      });
    });

    describe('disabled state', () => {
      it('renders sbb-checkbox in disabled state', async () => {
        const { root } = await newSpecPage({
          components: [SbbCheckbox],
          html: '<sbb-checkbox disabled>Label</sbb-checkox>',
        });
        expect(root).toEqualHtml(`
            <sbb-checkbox disabled>
              <mock:shadow-root>
                <label class="sbb-checkbox sbb-checkbox--disabled" htmlfor="sbb-checkbox-5">
                  <input disabled id="sbb-checkbox-5" type="checkbox"/>
                  <span class="sbb-checkbox__inner">
                    <span class="sbb-checkbox__selection">
                      <span class="sbb-checkbox__icon">
                      </span>
                    </span>
                    <span class="sbb-checkbox__label">
                      <slot></slot>
                      <sbb-icon></sbb-icon>
                    </span>
                  </span>
                </label>
              </mock:shadow-root>
              Label
            </sbb-checkbox>
          `);
      });
    });
  });
});
