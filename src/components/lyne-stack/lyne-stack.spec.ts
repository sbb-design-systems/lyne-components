import { LyneStack } from './lyne-stack';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-stack', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneStack],
      html: '<lyne-stack />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-stack>
          <mock:shadow-root>
            <div class="stack stack--vertical" dir="ltr">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </lyne-stack>
      `);
  });

});
