import { newSpecPage } from '@stencil/core/testing';
import { SbbCheckbox } from './sbb-checkbox';

describe('sbb-checkbox', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCheckbox],
      html: '<sbb-checkbox>Label</sbb-checkox>',
    });

    expect(root).toEqualHtml(`
      <sbb-checkbox icon-placement="end" size="s">
        <mock:shadow-root>
          <label class="sbb-checkbox" htmlfor="sbb-checkbox-1">
            <input id="sbb-checkbox-1" type="checkbox"/>
            <span class="sbb-checkbox__inner">
              <span class="sbb-checkbox__aligner">
                <span class="sbb-checkbox__selection">
                  <span class="sbb-checkbox__icon"></span>
                </span>
              </span>
              <span class="sbb-checkbox__label">
                <slot></slot>
              </span>
            </span>
          </label>
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
        <sbb-checkbox icon-name="tickets-class-small" icon-placement="start" size="s">
          <mock:shadow-root>
            <label class="sbb-checkbox" htmlfor="sbb-checkbox-2">
              <input id="sbb-checkbox-2" type="checkbox"/>
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__aligner">
                  <span class="sbb-checkbox__selection">
                    <span class="sbb-checkbox__icon"></span>
                  </span>
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
        <sbb-checkbox checked="" icon-placement="end" size="s">
          <mock:shadow-root>
            <label class="sbb-checkbox" htmlfor="sbb-checkbox-3">
              <input checked="" id="sbb-checkbox-3" type="checkbox"/>
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__aligner">
                  <span class="sbb-checkbox__selection">
                    <span class="sbb-checkbox__icon">
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.3304L10.4615 15L16 9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </span>
                  </span>
                </span>
                <span class="sbb-checkbox__label">
                  <slot></slot>
                </span>
              </span>
            </label>
          </mock:shadow-root>
          Label
        </sbb-checkbox>
      `);
    });

    it('indeterminate', async () => {
      const { root } = await newSpecPage({
        components: [SbbCheckbox],
        html: '<sbb-checkbox indeterminate="true">Label</sbb-checkbox>',
      });

      expect(root).toEqualHtml(`
        <sbb-checkbox indeterminate="" icon-placement="end" size="s">
          <mock:shadow-root>
            <label class="sbb-checkbox" htmlfor="sbb-checkbox-4">
              <input id="sbb-checkbox-4" type="checkbox">
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__aligner">
                  <span class="sbb-checkbox__selection">
                    <span class="sbb-checkbox__icon">
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12H15" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </span>
                  </span>
                </span>
                <span class="sbb-checkbox__label">
                  <slot></slot>
                </span>
              </span>
            </label>
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
        <sbb-checkbox disabled="" icon-placement="end" size="s">
          <mock:shadow-root>
            <label class="sbb-checkbox" htmlfor="sbb-checkbox-5">
              <input disabled id="sbb-checkbox-5" type="checkbox"/>
              <span class="sbb-checkbox__inner">
                <span class="sbb-checkbox__aligner">
                  <span class="sbb-checkbox__selection">
                    <span class="sbb-checkbox__icon"></span>
                  </span>
                </span>
                <span class="sbb-checkbox__label">
                  <slot></slot>
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
