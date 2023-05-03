import { SbbCardBadge } from './sbb-card-badge';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card-badge', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCardBadge],
      html: '<sbb-card-badge />',
    });

    expect(root).toEqualHtml(`
        <sbb-card-badge slot="badge" color="charcoal" role="text" dir="ltr">
          <mock:shadow-root>
            <span class="sbb-card-badge-wrapper">
              <span class="sbb-card-badge">
                <span class="sbb-card-badge-background" aria-hidden="true"></span>
                <span class="sbb-card-badge-content">
                  <slot />
                </span>
              </span>
            </span>
          </mock:shadow-root>
        </sbb-card-badge>
      `);
  });
});
