import { SbbCardBadge } from './sbb-card-badge';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card-badge', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCardBadge],
      html: '<sbb-card-badge />',
    });

    expect(root).toEqualHtml(`
        <sbb-card-badge>
          <mock:shadow-root>
            <span class="card-badge card-badge--primary card-badge--regular" dir="ltr" role="text"></span>
          </mock:shadow-root>
        </sbb-card-badge>
      `);
  });
});
