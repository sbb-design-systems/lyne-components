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
            <div class="stack stack--vertical" style="column-gap: calc(var(--spacing-fixed-3x) / var(--typo-scale-default) * 1rem); row-gap: calc(var(--spacing-fixed-3x) / var(--typo-scale-default) * 1rem);">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </lyne-stack>
      `);
  });

});
