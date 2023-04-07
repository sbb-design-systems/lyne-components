import { SbbSkiplinkList } from './sbb-skiplink-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-skiplink-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSkiplinkList],
      html: '<sbb-skiplink-list />',
    });

    expect(root).toEqualHtml(`
        <sbb-skiplink-list>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-skiplink-list>
      `);
  });
});
