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
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-card-badge>
      `);
  });

});
