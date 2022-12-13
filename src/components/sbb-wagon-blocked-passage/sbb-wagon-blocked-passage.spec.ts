import { SbbWagonBlockedPassage } from './sbb-wagon-blocked-passage';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-wagon-blocked-passage', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagonBlockedPassage],
      html: '<sbb-wagon-blocked-passage />',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon-blocked-passage>
          <mock:shadow-root>
            <div class="sbb-wagon-blocked-passage">
              <div class="sbb-wagon-blocked-passage__icon"></div>
            </div>
          </mock:shadow-root>
        </sbb-wagon-blocked-passage>
      `);
  });
});
