import { SbbFooter } from './sbb-footer';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-footer', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFooter],
      html: '<sbb-footer accessibility-title="Footer" />',
    });

    expect(root).toEqualHtml(`
        <sbb-footer accessibility-title="Footer" variant="default">
          <mock:shadow-root>
            <footer class="sbb-footer">
              <h1 class="sbb-footer__title">Footer</h1>
              <slot></slot>
            </footer>
          </mock:shadow-root>
        </sbb-footer>
      `);
  });
});
