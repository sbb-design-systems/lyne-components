import { SbbDialog } from './sbb-dialog';
import { newSpecPage } from '@stencil/core/testing';
import { i18nCloseDialog } from '../../global/i18n';

describe('sbb-dialog', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDialog],
      html: '<sbb-dialog />',
    });

    expect(root).toEqualHtml(`
      <sbb-dialog data-state="closed" data-fullscreen>
        <mock:shadow-root>
          <dialog class="sbb-dialog">
            <div class="sbb-dialog__wrapper">
              <div class="sbb-dialog__header">
                <sbb-button
                  accessibility-label="${i18nCloseDialog.en}"
                  class="sbb-dialog__close"
                  icon-name="cross-small"
                  sbb-dialog-close=""
                  size="m"
                  type="button"
                  variant="secondary">
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
