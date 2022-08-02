import { SbbHeader } from './sbb-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeader],
      html: '<sbb-header />',
    });

    expect(root).toEqualHtml(`
        <sbb-header>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-header>
      `);
  });
});
