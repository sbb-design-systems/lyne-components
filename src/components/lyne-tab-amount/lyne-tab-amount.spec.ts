import { LyneTabAmount } from './lyne-tab-amount';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-tab-amount', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTabAmount],
      html: '<lyne-tab-amount />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-tab-amount>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-tab-amount>
      `);
  });

});
