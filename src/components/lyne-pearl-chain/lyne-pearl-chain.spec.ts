import { LynePearlchain } from './lyne-pearlchain';
import { newSpecPage } from '@stencil/core/testing';

const legs = JSON.stringify({
  legs: [
    {
      cancellation: false,
      duration: 100
    }
  ]
});

describe('lyne-pearlchain', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePearlchain],
      html: `<lyne-pearlchain legs='${legs}' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-pearlchain legs="{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:100}]}">
          <mock:shadow-root>
            <div class="pearlchain">
              <div class="pearlchain__leg" style="flex-basis: 100%;"></div>
            </div>
          </mock:shadow-root>
        </lyne-pearlchain>
      `);
  });

});
