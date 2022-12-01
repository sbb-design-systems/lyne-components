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
              <sbb-button accessibility-label="Close modal" class="sbb-dialog__close" icon-name="cross-small" negative="" size="m" type="button" variant="transparent"></sbb-button>
              <div class="sbb-navigation__content">
                <slot></slot>
              </div>
            </dialog>
          </mock:shadow-root>
        </sbb-navigation>
      `);
  });
});
