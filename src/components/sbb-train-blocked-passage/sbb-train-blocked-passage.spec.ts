import { SbbTrainBlockedPassage } from './sbb-train-blocked-passage';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train-blocked-passage', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrainBlockedPassage],
      html: '<sbb-train-blocked-passage />',
    });

    expect(root).toEqualHtml(`
        <sbb-train-blocked-passage>
          <mock:shadow-root>
            <span class="sbb-train-blocked-passage">
              <span class="sbb-train-blocked-passage__wrapper">
                <span class="sbb-train-blocked-passage__icon"></span>
              </span>
            </span>
          </mock:shadow-root>
        </sbb-train-blocked-passage>
      `);
  });
});
