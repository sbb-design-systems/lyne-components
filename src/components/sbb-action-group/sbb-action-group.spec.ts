import { SbbActionGroup } from './sbb-action-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbActionGroup],
      html: '<sbb-action-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-action-group>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-action-group>
      `);
  });
});
