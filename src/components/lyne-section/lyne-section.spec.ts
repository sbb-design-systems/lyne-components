import { LyneSection } from './lyne-section';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-section', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneSection],
      html: '<lyne-section accessibility-title="Footer" />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-section accessibility-title="Footer" role="contentinfo">
          <mock:shadow-root>
            <section class="section section--primary">
              <lyne-title level="1" text="Footer" visually-hidden="true"></lyne-title>
            </section>
          </mock:shadow-root>
        </lyne-section>
      `);
  });

});
