import { SbbNavigationAction } from './sbb-navigation-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-action', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationAction],
      html: '<sbb-navigation-action />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-action size="l" role="button" tabindex="0">
          <mock:shadow-root>
            <button class="sbb-navigation-action" dir="ltr" type="button" role="presentation" tabindex="-1">
              <slot></slot>
            </button>
         </mock:shadow-root>
        </sbb-navigation-action>
      `);
  });
});
