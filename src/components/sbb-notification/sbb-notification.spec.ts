import { SbbNotification } from './sbb-notification';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-notification', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNotification],
      html: '<sbb-notification />',
    });

    expect(root).toEqualHtml(`
      <sbb-notification data-state="closed" type="info" variant="default">
        <mock:shadow-root>
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="transparent"></sbb-button>
            </span>
          </div>
        </mock:shadow-root>
      </sbb-notification>`);
  });
});
