import { SbbNavigation } from './sbb-navigation';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigation],
      html: '<sbb-navigation />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation>
          <mock:shadow-root>
            <dialog class="sbb-navigation">
              <div class="sbb-navigation__content">
                <slot></slot>
              </div>
            </dialog>
          </mock:shadow-root>
        </sbb-navigation>
      `);
  });
});
