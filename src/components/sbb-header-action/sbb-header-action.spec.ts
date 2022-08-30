import { newSpecPage } from '@stencil/core/testing';
import { SbbHeaderAction } from './sbb-header-action';

describe('sbb-header-action', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: '<sbb-header-action />',
    });

    expect(root).toEqualHtml(`
      <sbb-header-action expand-from="medium">
        <mock:shadow-root>
          <button class="header-action__button" dir="ltr" id="sbb-action-header-1" type="button">
            <span class="header-action__icon">
              <slot name="icon">
                <sbb-icon></sbb-icon>
              </slot>
            </span>
            <span class="header-action__label">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
      </sbb-header-action>
    `);
  });

  it('renders an anchor tag into the shadow root', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: '<sbb-header-action expand-from="medium" href="https://github.com/lyne-design-system/lyne-components" />',
    });

    expect(root).toEqualHtml(`
    <sbb-header-action expand-from="medium" href="https://github.com/lyne-design-system/lyne-components">
      <mock:shadow-root>
        <a dir="ltr" id="sbb-action-header-2" rel="external noopener nofollow" target="_blank" class="header-action__link" id="sbb-action-header-2" href="https://github.com/lyne-design-system/lyne-components">
          <span class="header-action__icon">
            <slot name="icon">
              <sbb-icon></sbb-icon>
            </slot>
          </span>
          <span class="header-action__label">
            <slot></slot>
          </span>
        </a>
      </mock:shadow-root>
    </sbb-header-action>
    `);
  });
});
