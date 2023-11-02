import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { i18nCloseTooltip } from '../core/i18n';
import './sbb-tooltip';

describe('sbb-tooltip', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tooltip />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-tooltip data-state="closed" id="sbb-tooltip-1" role="tooltip">

        </sbb-tooltip>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-tooltip__container">
          <div class="sbb-tooltip">
            <div class="sbb-tooltip__content">
              <span>
                <slot>
                  No content
                </slot>
              </span>
              <span class="sbb-tooltip__close">
                <sbb-button
                  data-icon-only=""
                  dir="ltr"
                  aria-label="${i18nCloseTooltip.en}"
                  icon-name="cross-small"
                  role="button"
                  sbb-tooltip-close=""
                  size="m"
                  type="button"
                  tabindex="0"
                  variant="secondary"
                ></sbb-button>
              </span>
            </div>
          </div>
        </div>
      `,
    );
  });
});
