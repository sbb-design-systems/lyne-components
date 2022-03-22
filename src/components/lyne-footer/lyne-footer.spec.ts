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
        <lyne-footer accessibility-title="Footer">
          <mock:shadow-root>
            <footer role="contentinfo" class="footer footer--primary">
              <lyne-title level="1" text="Footer" visually-hidden="true"></lyne-title>
            </footer>
          </mock:shadow-root>
        </lyne-footer>
      `);
  });

});
