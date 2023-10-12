import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { i18nCloseTooltip } from '../../global/i18n';
import './sbb-tooltip';

describe('sbb-tooltip', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tooltip />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-tooltip data-state="closed" id="sbb-tooltip-1">
          
        </sbb-tooltip>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-tooltip__container">
          <dialog class="sbb-tooltip" role="tooltip">
            <div class="sbb-tooltip__content">
              <span>
                <slot>
                  No content
                </slot>
              </span>
              <span class="sbb-tooltip__close">
                <sbb-button aria-label="${i18nCloseTooltip.en}" icon-name="cross-small" sbb-tooltip-close="" size="m" type="button" variant="secondary"></sbb-button>
              </span>
            </div>
          </dialog>
        </div>
      `,
    );
  });
});
