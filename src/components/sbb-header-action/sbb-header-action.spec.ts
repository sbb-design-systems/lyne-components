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
          <button class="header-action__button" dir="ltr" id="sbb-action-header-1">
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
});
