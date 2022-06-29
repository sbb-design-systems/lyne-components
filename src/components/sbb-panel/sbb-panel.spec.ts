import { SbbPanel } from './sbb-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbPanel],
      html: '<sbb-panel />',
    });

    expect(root).toEqualHtml(`
        <sbb-panel>
          <mock:shadow-root>
            <div class="panel">
              <div class="panel__text">
                <slot name="text"></slot>
              </div>
              <div class="panel__link">
                <slot name="link"></slot>
              </div>
          </mock:shadow-root>
        </sbb-panel>
      `);
  });
});
