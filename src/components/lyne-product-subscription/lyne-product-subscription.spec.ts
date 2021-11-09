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
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-product-subscription>
      `);
  });

});
