import { SbbTrain } from './sbb-train';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train />',
    });

    expect(root).toEqualHtml(`
        <sbb-train>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-train>
      `);
  });
});
