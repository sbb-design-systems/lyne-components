import { SbbDialog } from './sbb-dialog';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-dialog', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDialog],
      html: '<sbb-dialog />',
    });

    expect(root).toEqualHtml(`
      <sbb-dialog class="sbb-dialog--closed sbb-dialog--full-screen">
        <mock:shadow-root>
          <dialog aria-labelledby="sbb-dialog-title-1" class="sbb-dialog" id="sbb-dialog-1">
            <div class="sbb-dialog__wrapper">
              <div class="sbb-dialog__header">
                <sbb-button
                  accessibility-label="Close modal"
                  class="sbb-dialog__close"
                  icon-name="cross-small"
                  sbb-dialog-close=""
                  size="m"
                  type="button"
                  variant="secondary"
                  accessibility-controls="sbb-dialog-1">
                </sbb-button>
              </div>
              <div class="sbb-dialog__content">
                <slot></slot>
              </div>
            </div>
          </dialog>
        </mock:shadow-root>
      </sbb-dialog>
    `);
  });
});
