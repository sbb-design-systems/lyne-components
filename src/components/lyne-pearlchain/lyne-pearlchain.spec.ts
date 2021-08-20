import { LynePearlchain } from './lyne-pearlchain';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-pearlchain', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePearlchain],
      html: '<lyne-pearlchain />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-pearlchain>
          <mock:shadow-root>
            <div class="pearlchain">
              <span class="pearlchain__line"></span>
            </div>
          </mock:shadow-root>
        </lyne-pearlchain>
      `);
  });

});
