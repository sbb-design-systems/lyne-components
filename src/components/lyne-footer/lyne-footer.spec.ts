import { LyneFooter } from './lyne-footer';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-footer', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneFooter],
      html: '<lyne-footer accessibility-title="Footer" />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-footer accessibility-title="Footer" role="contentinfo">
          <mock:shadow-root>
            <footer class="footer footer--primary">
              <h1 class="title--visually-hidden">
                Footer
              </h1>
            </footer>
          </mock:shadow-root>
        </lyne-footer>
      `);
  });

});
