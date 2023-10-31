import { i18nCloseDialog } from '../../global/i18n';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../sbb-dialog';

describe('sbb-dialog', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-dialog></sbb-dialog>`);

    expect(root).dom.to.be.equal(`<sbb-dialog data-state="closed" data-fullscreen></sbb-dialog>`);
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-dialog__container">
          <div class="sbb-dialog" id="sbb-dialog-0">
            <div class="sbb-dialog__wrapper">
              <div class="sbb-dialog__header">
                <sbb-button
                  aria-label="${i18nCloseDialog.en}"
                  class="sbb-dialog__close"
                  data-icon-only=""
                  dir="ltr"
                  icon-name="cross-small"
                  sbb-dialog-close=""
                  size="m"
                  type="button"
                  role="button"
                  tabindex="0"
                  variant="secondary">
                </sbb-button>
              </div>
              <div class="sbb-dialog__content">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
        <span aria-live="polite" class="sbb-screen-reader-only"></span>
      `,
    );
  });
});
