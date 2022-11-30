import { SbbNavigationAction } from './sbb-navigation-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-action', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationAction],
      html: '<sbb-navigation-action />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-action>
          <mock:shadow-root>
            <button class="sbb-navigation-action" dir="ltr" type="button">
              <span class="sbb-navigation-action__content">
                <span class="sbb-navigation-action__icon">
                  <slot name="icon"></slot>
                </span>
                <span class="sbb-navigation-action__label">
                  <slot></slot>
                </span>
              </span>
            </button>
         </mock:shadow-root>
        </sbb-navigation-action>
      `);
  });
});
