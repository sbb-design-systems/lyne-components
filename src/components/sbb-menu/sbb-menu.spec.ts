import { SbbMenu } from './sbb-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenu],
      html: '<sbb-menu />',
    });

    expect(root).toEqualHtml(`
        <sbb-menu>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-menu>
      `);
  });
});
