import { newSpecPage } from '@stencil/core/testing';
import { SbbHeaderAction } from './sbb-header-action';

describe('sbb-header-action', () => {
  it('renders the component as a button', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: `<sbb-header-action name="test" type="reset" value="value">Action</sbb-header-action>`,
    });

    expect(root).toEqualHtml(`
      <sbb-header-action expand-from="medium" name="test" type="reset" value="value">
        <mock:shadow-root>
          <button class="header-action__button" dir="ltr" id="sbb-action-header-1" name="test" type="reset" value="value">
            <span class="header-action__icon">
              <slot name="icon">
                <sbb-icon></sbb-icon>
              </slot>
            </span>
            <span class="header-action__text">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        Action
      </sbb-header-action>
    `);
  });

  it('renders the component as a link', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: '<sbb-header-action expand-from="small" href="https://github.com/lyne-design-system/lyne-components" target="_blank">Action</sbb-header-action>',
    });

    expect(root).toEqualHtml(`
      <sbb-header-action expand-from="small" href="https://github.com/lyne-design-system/lyne-components" target="_blank" >
        <mock:shadow-root>
          <a dir="ltr" id="sbb-action-header-2" rel="external noopener nofollow" target="_blank" class="header-action__link" href="https://github.com/lyne-design-system/lyne-components">
            <span class="header-action__icon">
              <slot name="icon">
                <sbb-icon></sbb-icon>
              </slot>
            </span>
            <span class="header-action__text">
              <slot></slot>
            </span>
          </a>
        </mock:shadow-root>
        Action
      </sbb-header-action>
    `);
  });
});
