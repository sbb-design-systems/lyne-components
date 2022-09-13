import { SbbActionGroup } from './sbb-action-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbActionGroup],
      html: '<sbb-action-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-action-group slot="action-group">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
        </sbb-action-group>
      `);
  });
});
