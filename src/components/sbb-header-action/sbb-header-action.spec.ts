import { SbbHeaderAction } from './sbb-header-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-header-action', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeaderAction],
      html: '<sbb-header-action />',
    });

    expect(root).toEqualHtml(`
        <sbb-header-action>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-header-action>
      `);
  });
});
