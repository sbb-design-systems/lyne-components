import { SbbTag } from './sbb-tag';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag />',
    });

    expect(root).toEqualHtml(`
        <sbb-tag>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-tag>
      `);
  });
});
