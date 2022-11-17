import { SbbToggle } from './sbb-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle aria-label="sbb-toggle-1-name">
          <mock:shadow-root>
            <div class="sbb-toggle">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });
});
