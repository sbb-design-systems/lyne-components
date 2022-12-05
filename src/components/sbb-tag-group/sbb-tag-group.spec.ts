import { SbbTagGroup } from './sbb-tag-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tag-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTagGroup],
      html: '<sbb-tag-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-tag-group>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-tag-group>
      `);
  });
});
