import { SbbAlert } from './sbb-alert';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-alert', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlert],
      html: '<sbb-alert />',
    });

    expect(root).toEqualHtml(`
        <sbb-alert>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-alert>
      `);
  });
});
