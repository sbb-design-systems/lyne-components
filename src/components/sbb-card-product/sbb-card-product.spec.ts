import { SbbCardProduct } from './sbb-card-product';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card-product', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbCardProduct],
      html: '<sbb-card-product href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="SBB product card" />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-card-product href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="SBB product card">
          <mock:shadow-root>
            <a aria-label="SBB product card. Link target opens in new window." class="card-product card-product--primary card-product--standard" href="https://github.com/lyne-design-system/lyne-components" rel="external noopener nofollow" target="_blank">
              <div class="card-product__content">
                <div class="card-product__inner"></div>
              </div>
            </a>
          </mock:shadow-root>
        </sbb-card-product>
      `);
  });

});
