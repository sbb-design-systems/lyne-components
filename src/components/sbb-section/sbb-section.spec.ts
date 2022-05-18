import { SbbSection } from './sbb-section';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-section', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbSection],
      html: '<sbb-section />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-section>
          <mock:shadow-root>
            <section class="section section--full-bleed--forever section--primary"></section>
          </mock:shadow-root>
        </sbb-section>
      `);
  });

});
