import { SbbPearlChain } from './sbb-pearl-chain';
import { newSpecPage } from '@stencil/core/testing';

const legs = JSON.stringify({
  legs: [
    {
      cancellation: false,
      duration: 100,
    },
  ],
});

describe('sbb-pearl-chain', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbPearlChain],
      html: `<sbb-pearl-chain legs='${legs}' />`,
    });

    expect(root).toEqualHtml(`
        <sbb-pearl-chain legs="{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:100}]}">
          <mock:shadow-root>
            <div class="pearl-chain">
              <div class="pearl-chain__leg" style="flex-basis: 100%;"></div>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
  });
});
