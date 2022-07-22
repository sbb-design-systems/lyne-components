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
            <label class="checkbox" htmlfor="sbb-checkbox-1">
              <input id="sbb-checkbox-1" type="checkbox"/>
              <span class="checkbox__inner">
                <span class="checkbox__selection">
                  <span class="checkbox__icon"></span>
                </span>
                <span class="checkbox__label">
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
        html: '<sbb-checkbox label-icon="tickets-class-small" label-reversed="true" >Label</sbb-checkox>',
      });
      expect(root).toEqualHtml(`
          <sbb-checkbox label-icon="tickets-class-small" label-reversed="true">
            <mock:shadow-root>
              <label class="checkbox" htmlfor="sbb-checkbox-2">
                <input id="sbb-checkbox-2" type="checkbox"/>
                <span class="checkbox__inner">
                  <span class="checkbox__selection">
                    <span class="checkbox__icon"></span>
                  </span>
                  <span class="checkbox__label checkbox__label--reverse">
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
          html: '<sbb-checkbox checked>Label</sbb-checkox>',
        });
        expect(root).toEqualHtml(`
            <sbb-checkbox checked="">
              <mock:shadow-root>
                <label class="checkbox" htmlfor="sbb-checkbox-3">
                  <input checked="" id="sbb-checkbox-3" type="checkbox"/>
                  <span class="checkbox__inner">
                    <span class="checkbox__selection">
                      <span class="checkbox__icon">
                        <svg fill="none" height="8" viewBox="0 0 10 8" width="10" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.33 3.462 7 9 1" stroke="#EB0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="checkbox__label">
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

    describe('disabled state', () => {
      it('renders sbb-checkbox in disabled state', async () => {
        const { root } = await newSpecPage({
          components: [SbbCheckbox],
          html: '<sbb-checkbox disabled>Label</sbb-checkox>',
        });
        expect(root).toEqualHtml(`
            <sbb-checkbox disabled>
              <mock:shadow-root>
                <label class="checkbox checkbox--disabled" htmlfor="sbb-checkbox-4">
                  <input disabled id="sbb-checkbox-4" type="checkbox"/>
                  <span class="checkbox__inner">
                    <span class="checkbox__selection">
                      <span class="checkbox__icon">
                      </span>
                    </span>
                    <span class="checkbox__label">
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
