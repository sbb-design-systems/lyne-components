import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainVertical } from './sbb-pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVertical],
      html: `
            <sbb-pearl-chain-vertical>
            </sbb-pearl-chain-vertical>
        `,
    });
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
        <sbb-pearl-chain-vertical>
          <mock:shadow-root>
            <div class="sbb-pearl-chain-vertical" style="display: table;  table-layout: fixed;">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain-vertical>
      `);
  });
});
