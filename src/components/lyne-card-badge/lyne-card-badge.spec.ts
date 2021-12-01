import { LyneCardBadge } from './lyne-card-badge';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-card-badge', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCardBadge],
      html: '<lyne-card-badge />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-card-badge>
          <mock:shadow-root>
            <span class="card-badge card-badge--primary card-badge--regular" dir="ltr" role="text"></span>
          </mock:shadow-root>
        </lyne-card-badge>
      `);
  });

});
