import { SbbToggle } from './sbb-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle>
          <mock:shadow-root>
            <div class="sbb-toggle" tabindex="0">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });
});
