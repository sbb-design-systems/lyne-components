import { SbbNavigationSection } from './sbb-navigation-section';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-section', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationSection],
      html: '<sbb-navigation-section />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-section class="sbb-navigation-section--closed" slot="navigation-section">
          <mock:shadow-root>
            <dialog class="sbb-navigation-section" id="sbb-navigation-section-1">
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
