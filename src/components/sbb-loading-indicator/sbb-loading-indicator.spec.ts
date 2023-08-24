import { SbbLoadingIndicator } from './sbb-loading-indicator';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-loading-indicator', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator />',
    });

    expect(root).toEqualHtml(`
        <sbb-loading-indicator>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-loading-indicator>
      `);
  });
});
