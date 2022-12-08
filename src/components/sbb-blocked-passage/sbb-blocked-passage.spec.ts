import { SbbBlockedPassage } from './sbb-blocked-passage';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-blocked-passage', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbBlockedPassage],
      html: '<sbb-blocked-passage />',
    });

    expect(root).toEqualHtml(`
        <sbb-blocked-passage>
          <mock:shadow-root>
            <div class="sbb-blocked-passage">
              <div class="sbb-blocked-passage__icon"></div>
            </div>
          </mock:shadow-root>
        </sbb-blocked-passage>
      `);
  });
});
