import { LyneCardProduct } from './lyne-card-product';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-card-product', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCardProduct],
      html: '<lyne-card-product />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-card-product>
          <mock:shadow-root>
            <div class="product product--primary">
              <div class="product__content">
                <div>
                  <div class="product__lead"></div>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-card-product>
      `);
  });

});
