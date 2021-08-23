import { LynePearlChain } from './lyne-pearl-chain';
import { newSpecPage } from '@stencil/core/testing';

const legs = JSON.stringify({
  legs: [
    {
      cancellation: false,
      duration: 100
    }
  ]
});

describe('lyne-pearl-chain', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePearlChain],
      html: `<lyne-pearl-chain legs='${legs}' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-pearl-chain legs="{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:100}]}">
          <mock:shadow-root>
            <div class="pearl-chain">
              <div class="pearl-chain__leg" style="flex-basis: 100%;"></div>
            </div>
          </mock:shadow-root>
        </lyne-pearl-chain>
      `);
  });

});
