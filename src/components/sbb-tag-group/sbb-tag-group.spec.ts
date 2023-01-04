import { SbbTagGroup } from './sbb-tag-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tag-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTagGroup],
      html: `
        <sbb-tag-group>
          <sbb-tag value="tag-1">First tag</sbb-tag>
          <sbb-tag value="tag-2">Second tag</sbb-tag>
          <sbb-tag value="tag-3">Third tag</sbb-tag>
        </sbb-tag-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-tag-group>
        <mock:shadow-root>
          <div class="sbb-tag-group">
            <slot />
          </div>
        </mock:shadow-root>
        <sbb-tag value="tag-1">First tag</sbb-tag>
        <sbb-tag value="tag-2">Second tag</sbb-tag>
        <sbb-tag value="tag-3">Third tag</sbb-tag>
      </sbb-tag-group>
    `);
  });
});
