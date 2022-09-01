import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainVertical } from './sbb-pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
  describe('sbb-pearl-chain-vertical with one leg', () => {
    it('renders compont with config', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChainVertical],
        html: `
            <sbb-pearl-chain-vertical>
            </sbb-pearl-chain-vertical>
        `,
      });
      page.rootInstance.legs = [
        {
          duration: 60,
        },
      ];
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-pearl-chain-vertical>
          <mock:shadow-root>
            <div class="pearl-chain">
              <div class="pearl-chain__leg pearl-chain__leg--future" style="height: 100%;"></div>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain-vertical>
      `);
    });
  });
});
