import { SbbFooter } from './sbb-footer';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-footer', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFooter],
      html: '<sbb-footer accessibility-title="Footer" />',
    });

    expect(root).toEqualHtml(`
        <sbb-footer accessibility-title="Footer">
          <mock:shadow-root>
            <footer role="contentinfo" class="footer footer--primary">
              <sbb-title level="1" visually-hidden="true">Footer</sbb-title>
            </footer>
          </mock:shadow-root>
        </sbb-footer>
      `);
  });
});
