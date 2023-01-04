import { SbbToggle } from './sbb-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle role="radiogroup" size="m">
          <mock:shadow-root>
            <div class="sbb-toggle" tabindex="-1">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });
});
