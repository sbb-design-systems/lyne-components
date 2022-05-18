import { LyneCardProduct } from './lyne-card-product';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-card-product', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCardProduct],
      html: '<lyne-card-product href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="Lyne product card" />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-card-product href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="Lyne product card">
          <mock:shadow-root>
            <a aria-label="Lyne product card. Link target opens in new window." class="card-product card-product--primary card-product--standard" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank">
              <div class="card-product__content">
                <div class="card-product__inner"></div>
              </div>
            </a>
          </mock:shadow-root>
        </lyne-card-product>
      `);
  });

});
