import { LyneProductSubscription } from './lyne-product-subscription';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-product-subscription', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneProductSubscription],
      html: '<lyne-product-subscription />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-product-subscription>
          <mock:shadow-root>
            <div class="product-subscription product-subscription--primary" itemscope="" itemtype="https://schema.org/Product">
              <div class="product-subscription__content">
                <div>
                  <div class="product-subscription__lead"></div>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-product-subscription>
      `);
  });

});
