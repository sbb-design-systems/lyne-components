import { LyneTabLabel } from './lyne-tab-label';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-tab-label', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTabLabel],
      html: '<lyne-tab-label />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-tab-label>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-tab-label>
      `);
  });

});
