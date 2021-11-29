import { LyneProductTicket } from './lyne-product-ticket';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-product-ticket', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneProductTicket],
      html: '<lyne-product-ticket />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-product-ticket>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-product-ticket>
      `);
  });

});
