import { SbbWagon } from './sbb-wagon';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-wagon', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon />',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
});
