import { newSpecPage } from '@stencil/core/testing';
import { SbbHeaderAction } from './sbb-header-action';

describe('sbb-header-action', () => {
  it('renders the component as a button with icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: `
        <sbb-header-action icon='pie-small' name="test" type="reset" value="value" accessibility-controls="id" accessibility-haspopup="dialog">
          Action
        </sbb-header-action>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-header-action icon='pie-small' expand-from="medium" name="test" type="reset" value="value" accessibility-controls="id" accessibility-haspopup="dialog">
        <mock:shadow-root>
          <button class="header-action__button" dir="ltr" id="sbb-header-action-1" name="test" type="reset" value="value" aria-controls="id" aria-haspopup="dialog">
            <span class="header-action__icon">
              <slot name="icon">
                <sbb-icon name="pie-small"></sbb-icon>
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

  it('renders the component as a link without icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: '<sbb-header-action expand-from="small" href="https://github.com/lyne-design-system/lyne-components" target="_blank">Action</sbb-header-action>',
    });

    expect(root).toEqualHtml(`
      <sbb-header-action expand-from="small" href="https://github.com/lyne-design-system/lyne-components" target="_blank" >
        <mock:shadow-root>
          <a dir="ltr" id="sbb-header-action-2" rel="external noopener nofollow" target="_blank" class="header-action__link" href="https://github.com/lyne-design-system/lyne-components">
            <span class="header-action__icon">
              <slot name="icon"/>
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
