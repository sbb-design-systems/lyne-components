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
            <div class="product-ticket product-ticket--primary">
              <div class="product-ticket__content">
                <div></div>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-product-ticket>
      `);
  });

});
