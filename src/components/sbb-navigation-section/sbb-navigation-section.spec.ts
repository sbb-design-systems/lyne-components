import { SbbNavigationSection } from './sbb-navigation-section';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-section', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationSection],
      html: '<sbb-navigation-section />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-section slot="navigation-section" data-state="closed" id="sbb-navigation-section-1">
          <mock:shadow-root>
            <div class="sbb-navigation-section__container">
              <dialog class="sbb-navigation-section" role="group" aria-labelledby="title">
                <div class="sbb-navigation-section__wrapper">
                  <div class="sbb-navigation-section__content">
                    <sbb-divider class="sbb-navigation-section__divider" negative orientation="vertical" />
                    <slot></slot>
                  </div>
                </div>
              </dialog>
            </div>
          </mock:shadow-root>
        </sbb-navigation-section>
      `);
  });
});
