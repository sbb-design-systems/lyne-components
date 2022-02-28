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
        <lyne-section accessibility-title="Footer">
          <mock:shadow-root>
            <section class="section section--full-bleed--forever section--primary">
              <lyne-title level="1" text="Footer" visually-hidden="true"></lyne-title>
            </section>
          </mock:shadow-root>
        </lyne-section>
      `);
  });

});
