import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainVertical } from './sbb-pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
  describe('sbb-pearl-chain-vertical without content', () => {
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
            <div class="sbb-pearl-chain-vertical" style="display: table;  table-layout: fixed; width: 100%;">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain-vertical>
      `);
    });
  });
});
