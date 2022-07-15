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
                <label class="checkbox checkbox--check" htmlfor="sbb-checkbox-3">
                  <input checked="" id="sbb-checkbox-3" type="checkbox"/>
                  <span class="checkbox__inner">
                    <span class="checkbox__selection">
                      <span class="checkbox__icon">
                        <span>
                          <sbb-icon />
                        </span>
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
