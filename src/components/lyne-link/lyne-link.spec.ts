import { LyneLink } from './lyne-link';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-link', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneLink],
      html: '<lyne-link />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-link>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-link>
      `);
  });

});
