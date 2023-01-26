import { SbbGroup } from './sbb-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbGroup],
      html: '<sbb-group>Content</sbb-group>',
    });

    expect(root).toEqualHtml(`
        <sbb-group color="white" padding="XXS-XXS">
          <mock:shadow-root>
            <div class="sbb-group">
              <slot></slot>
            </div>
          </mock:shadow-root>
          Content
        </sbb-group>
      `);
  });
});
