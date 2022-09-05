import { SbbMenuAction } from './sbb-menu-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu-action', () => {
  it('renders component as button', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenuAction],
      html: `
        <sbb-menu-action>
          <span>Action</span>
        </sbb-menu-action>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-menu-action>
          <mock:shadow-root>
            <button class="sbb-menu-action__button" dir="ltr" id="sbb-menu-action-1" type="button">
              <div class="sbb-menu-action__content">
                <span class="sbb-menu-action__icon">
                  <slot name="icon"></slot>
                </span>
                <span class="sbb-menu-action__label">
                  <slot></slot>
                </span>
              </div>
            </button>
          </mock:shadow-root>
          <span>Action</span>
        </sbb-menu-action>
      `);
  });

  it('renders component as link with icon and amount', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenuAction],
      html: `
        <sbb-menu-action icon="menu-small" amount="123456" href="https://github.com/lyne-design-system/lyne-components">
          <span>Action</span>
        </sbb-menu-action>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-menu-action amount="123456" icon="menu-small" href="https://github.com/lyne-design-system/lyne-components">
          <mock:shadow-root>
            <a class="sbb-menu-action__link" dir="ltr" id="sbb-menu-action-2" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank">
              <div class="sbb-menu-action__content">
                <span class="sbb-menu-action__icon">
                  <slot name="icon">
                    <sbb-icon name='menu-small'/>
                  </slot>
                </span>
                <span class="sbb-menu-action__label">
                  <slot></slot>
                </span>
                <span class="sbb-menu-action__amount">
                  123456
                </span>
              </div>
            </a>
          </mock:shadow-root>
          <span>Action</span>
        </sbb-menu-action>
      `);
  });
});
