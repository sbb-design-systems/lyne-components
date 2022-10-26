import { SbbDialog } from './sbb-dialog';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-dialog', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDialog],
      html: '<sbb-dialog />',
    });

    expect(root).toEqualHtml(`
      <sbb-dialog class="sbb-dialog--full-screen">
        <mock:shadow-root>
          <dialog aria-labelledby="sbb-dialog-title-1" class="sbb-dialog">
            <div class="sbb-dialog__wrapper">
              <div class="sbb-dialog__header">
                <sbb-button accessibility-label="Close" class="sbb-dialog__dismiss" iconname="cross-small" size="m" type="button" variant="secondary"></sbb-button>
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
