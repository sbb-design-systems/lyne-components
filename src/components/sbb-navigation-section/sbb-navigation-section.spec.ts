import { SbbNavigationSection } from './sbb-navigation-section';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-section', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationSection],
      html: '<sbb-navigation-section />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-section slot="navigation-section" data-state="closed">
          <mock:shadow-root>
            <dialog class="sbb-navigation-section">
              <div class="sbb-navigation-section__wrapper">
                <div class="sbb-navigation-section__content">
                  <slot></slot>
                </div>
              </div>
            </dialog>
          </mock:shadow-root>
        </sbb-navigation-section>
      `);
  });
});
