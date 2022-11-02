import { SbbTrainFormation } from './sbb-train-formation';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train-formation', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrainFormation],
      html: '<sbb-train-formation />',
    });

    expect(root).toEqualHtml(`
        <sbb-train-formation>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-train-formation>
      `);
  });
});
