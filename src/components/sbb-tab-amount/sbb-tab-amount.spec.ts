import { SbbTabAmount } from './sbb-tab-amount';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tab-amount', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTabAmount],
      html: '<sbb-tab-amount />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-tab-amount slot="sbb-tab-amount">
          <mock:shadow-root>
            <span class='tab-amount'>
              <slot/>
            </span>
          </mock:shadow-root>
        </sbb-tab-amount>
      `);
  });

});
