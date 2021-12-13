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
            <div class="card-product card-product--primary card-product--standard">
              <div class="card-product__content">
                <div></div>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-card-product>
      `);
  });

});
