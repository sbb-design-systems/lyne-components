import { LyneSection } from './lyne-section';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-section', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneSection],
      html: '<lyne-section />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-section>
          <mock:shadow-root>
            <section class="section section--full-bleed--forever section--primary"></section>
          </mock:shadow-root>
        </lyne-section>
      `);
  });

});
