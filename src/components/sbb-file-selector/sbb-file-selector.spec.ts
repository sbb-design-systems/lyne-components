import { SbbFileSelector } from './sbb-file-selector';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-file-selector', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFileSelector],
      html: '<sbb-file-selector />',
    });

    expect(root).toEqualHtml(`
        <sbb-file-selector>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-file-selector>
      `);
  });
});
