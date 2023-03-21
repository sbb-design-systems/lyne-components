import { SbbNavigationAction } from './sbb-navigation-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-action', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationAction],
      html: '<sbb-navigation-action />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-action size="l" role="button" tabindex="0" dir="ltr">
          <mock:shadow-root>
            <span class="sbb-navigation-action">
              <slot></slot>
            </span>
         </mock:shadow-root>
        </sbb-navigation-action>
      `);
  });
});
