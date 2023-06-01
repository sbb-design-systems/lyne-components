import { SbbToast } from './sbb-toast';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toast', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToast],
      html: '<sbb-toast />',
    });

    expect(root).toEqualHtml(`
        <sbb-toast>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-toast>
      `);
  });
});
