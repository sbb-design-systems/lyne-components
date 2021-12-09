import { LyneProduct } from './lyne-product';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-product', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneProduct],
      html: '<lyne-product />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-product>
          <mock:shadow-root>
            <div class="product product--primary">
              <div class="product__content">
                <div></div>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-product>
      `);
  });

});
