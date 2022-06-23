import { SbbStack } from './sbb-stack';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-stack', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbStack],
      html: '<sbb-stack />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-stack>
          <mock:shadow-root>
            <div class="stack stack--vertical" style="column-gap: var(--sbb-spacing-fixed-3x); row-gap: var(--sbb-spacing-fixed-3x)">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </sbb-stack>
      `);
  });

});
