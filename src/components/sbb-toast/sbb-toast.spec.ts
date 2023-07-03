import { SbbToast } from './sbb-toast';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toast', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToast],
      html: `
        <sbb-toast icon-name="circle-tick-small" dismissible="true">
          'Lorem ipsum dolor'
        </sbb-toast>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-toast position="bottom-center" icon-name="circle-tick-small" dismissible="true" data-state="closed" 
        data-has-icon data-has-action
      >
        <mock:shadow-root>
          <div class="sbb-toast__overlay-container">
            <div class="sbb-toast" aria-live="polite">
              <div class="sbb-toast__icon">
                <slot name="icon">
                  <sbb-icon name="circle-tick-small">
                  </sbb-icon>
                </slot>
              </div>
              <div class="sbb-toast__content">
                <slot></slot>
              </div>
              <div class="sbb-toast__action">
                <slot name="action">
                  <sbb-button class="sbb-toast__action-button" aria-label="Close message" variant="transparent" negative size="m" icon-name="cross-small" sbb-toast-close >
                  </sbb-button>
                </slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>  
        'Lorem ipsum dolor'
      </sbb-toast>
    `);
  });
});
