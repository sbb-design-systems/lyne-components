import { SbbCard } from './sbb-card';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: '<sbb-card />',
    });

    expect(root).toEqualHtml(`
        <sbb-card>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-card>
      `);
  });
});
