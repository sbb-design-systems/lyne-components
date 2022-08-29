import { SbbAlert } from './sbb-alert';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-alert', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlert],
      html: '<sbb-alert />',
    });

    expect(root).toEqualHtml(`
        <sbb-alert aria-live="assertive" id="sbb-alert-1" role="alert">
          <mock:shadow-root>
            <div class="sbb-alert__transition-wrapper" style="height: undefinedpx;">
              <div class="sbb-alert sbb-alert--size-m" style="opacity: 0;">
                <span class="sbb-alert__icon">
                  <slot name="icon">
                    <sbb-icon name="info"></sbb-icon>
                  </slot>
                </span>
                <span class="sbb-alert__content">
                  <slot></slot>
                </span>
                <span class="sbb-alert__close-button-wrapper">
                  <sbb-button aria-controls="sbb-alert-1" class="sbb-alert__close-button" icon="" icondescription="Close message" size="m" variant="transparent-negative"></sbb-button>
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-alert>
      `);
  });
});
