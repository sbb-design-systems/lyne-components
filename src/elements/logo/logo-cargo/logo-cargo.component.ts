import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, SbbElement } from '../../core.ts';
import { SbbLogoCommonElementMixin } from '../common/logo-common.ts';

import style from './logo-cargo.scss?inline';

/**
 * It displays the SBB Cargo logo.
 *
 * @cssprop [--sbb-logo-height=auto] - Can be used to set the height of the logo.
 */
export class SbbLogoCargoElement extends SbbLogoCommonElementMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-logo-cargo';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** Accessibility label which will be forwarded to the SVG logo. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public override accessor accessibilityLabel: string = 'SBB Cargo Logo';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-logo__svg-container">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 599 50">
          <title .textContent=${this.accessibilityLabel}></title>
          <path
            id="sbb-logo__word-mark"
            d="m 484.2 40.8 c 8.4 0 14 -4.8 14.5 -12.4 h -7 c -0.8 4.5 -3.2 6.6 -7.5 6.6 c -5.2 0 -8.6 -4.6 -8.6 -11.5 c 0 -7.1 3.5 -11.6 8.8 -11.6 c 3.9 0 6.2 1.9 7 5.7 h 7 c -0.6 -7.1 -6 -11.6 -14.1 -11.6 c -9.4 0 -15.7 7.1 -15.7 17.5 c 0 10.5 6.2 17.3 15.6 17.3 z m 33.8 -2.6 c 0 0.8 0.1 1.2 0.2 1.9 h 6.2 c -0.3 -1.3 -0.4 -2.2 -0.4 -3.9 c 0 -1.6 0.1 -3.1 0.1 -4.7 c 0 -2.3 0 -4.6 0 -6.9 c -0.1 -3.2 -0.8 -5 -2.1 -6.4 c -1.6 -1.8 -4.4 -2.8 -8.4 -2.8 c -6.8 0 -10.8 2.9 -11 8 h 6.2 c 0.4 -2.3 1.8 -3.4 4.6 -3.4 c 3 0 4.6 1.2 4.6 3.3 c 0 1.3 -0.5 1.8 -2 1.9 l -4.7 0.5 c -3 0.3 -4.4 0.6 -5.9 1.3 c -2.5 1.4 -3.8 3.5 -3.8 6.5 c 0 4.5 3.5 7.2 9.1 7.2 c 3 0 5.7 -0.9 7.3 -2.5 z m -1.8 -8.6 c 0.8 -0.1 1.3 -0.2 1.7 -0.4 v 1.8 c 0 3.2 -2.4 5.3 -6 5.3 c -2.2 0 -3.7 -1.2 -3.7 -3.2 c 0 -1.8 1.5 -2.9 4.2 -3.2 l 3.7 -0.3 l 0.1 0 z m 26.7 -8.4 c 0.8 0 1.6 0 1.9 0.1 v -5.6 c -0.6 -0.1 -1.1 -0.2 -2 -0.2 c -2.5 0 -5.6 1 -6.7 3.6 v -3.1 h -6.1 v 24.1 h 6.2 v -12 c 0 -3.6 1 -5.2 3.1 -6.2 c 1 -0.5 2.3 -0.7 3.6 -0.7 z m 26 23.3 c 1.1 -1.7 1.5 -3.5 1.5 -6.8 v -21.7 h -6.1 v 1.8 c -2.2 -1.7 -4.2 -2.4 -6.7 -2.4 c -6.4 0 -10.9 4.9 -10.9 12 c 0 7 4.5 11.7 11 11.7 c 2.6 0 4.6 -0.7 6.5 -2.4 v 2 c 0 3.6 -2 5.8 -5.5 5.8 c -2.8 0 -4.2 -0.9 -4.6 -2.9 h -6.7 c 0.2 4.8 4.4 7.7 11 7.7 c 4.8 0 8.4 -1.6 10.5 -4.8 z m -10.3 -10.4 c -3.3 0 -5.4 -2.7 -5.4 -6.9 c 0 -4.1 2.1 -6.7 5.4 -6.7 c 3.5 0 5.7 2.6 5.7 6.7 c 0 4.3 -2.2 6.9 -5.7 6.9 z m 28.1 6.6 c 7.3 0 12.3 -5.1 12.3 -12.6 c 0 -7.7 -4.9 -12.7 -12.4 -12.7 c -7.3 0 -12.3 5.2 -12.3 12.7 c 0 7.4 5.1 12.6 12.4 12.6 z m 0 -5 c -3.8 0 -6 -2.9 -6 -7.6 c 0 -4.7 2.3 -7.7 5.9 -7.7 c 3.8 0 6 2.9 6 7.7 c 0 4.7 -2.3 7.6 -5.9 7.6 z m -415.2 -24 c 4.1 0 6.1 1.6 6.5 5 h 6.8 c -0.2 -6.7 -5 -10.6 -12.9 -10.6 c -8 0 -12.9 3.9 -12.9 10 c 0 5.3 3.2 8.3 10.2 9.6 l 5.4 1 c 2.7 0.5 4.1 1.8 4.1 3.9 c 0 2.7 -2.6 4.6 -6.2 4.6 c -4.8 0 -6.9 -1.9 -7.4 -6.2 h -7.1 c 0.2 7.5 5.3 11.8 14.2 11.8 c 8.4 0 13.7 -4.2 13.7 -10.7 c 0 -5.2 -3.5 -8.6 -9.9 -9.7 l -6 -1.1 c -2.7 -0.5 -4.1 -1.7 -4.1 -3.7 c 0 -2.4 2.2 -3.9 5.6 -3.9 z m 45.9 3.6 c 0 -5.4 -4.2 -8.5 -11.5 -8.5 h -14.9 v 33.3 h 15.7 c 7.3 0 11.9 -3.7 11.9 -9.5 c 0 -4.3 -1.7 -6.9 -5.9 -8.5 c 3.3 -1.7 4.7 -3.9 4.7 -6.8 z m -6.9 1.1 c 0 2.3 -2.1 3.7 -5.6 3.7 h -6.9 v -7.7 h 6.8 c 3.8 0 5.7 1.3 5.7 4 z m 0.9 13.6 c 0 3 -2.1 4.5 -6.2 4.5 h -7.2 v -9 h 6.8 c 4.6 0 6.6 1.4 6.6 4.5 z m 38.9 -14.7 c 0 -5.4 -4.2 -8.5 -11.5 -8.5 h -15 v 33.3 h 15.8 c 7.3 0 11.9 -3.7 11.9 -9.5 c 0 -4.3 -1.7 -6.9 -5.9 -8.5 c 3.3 -1.7 4.7 -3.9 4.7 -6.8 z m -6.9 1.1 c 0 2.3 -2 3.7 -5.6 3.7 h -7 v -7.7 h 6.9 c 3.9 0 5.7 1.3 5.7 4 z m 0.9 13.6 c 0 3 -2 4.5 -6.2 4.5 h -7.3 v -9 h 7 c 4.5 0 6.5 1.4 6.5 4.5 z m 36.6 10.8 c 8.4 0 14 -4.8 14.5 -12.4 h -7 c -0.7 4.5 -3.1 6.6 -7.4 6.6 c -5.2 0 -8.6 -4.6 -8.6 -11.5 c 0 -7.1 3.4 -11.6 8.7 -11.6 c 3.9 0 6.3 1.9 7.1 5.7 h 6.9 c -0.6 -7.1 -6 -11.5 -14 -11.5 c -9.4 0 -15.8 7 -15.8 17.4 c 0 10.5 6.2 17.3 15.6 17.3 z m 26.4 -20.2 v -7.8 h 16.3 v -6 h -23.3 v 33.3 h 7 v -13.7 h 14.9 v -5.8 h -14.9 z m 29.4 0 v -7.8 h 16.4 v -6 h -23.4 v 33.3 h 7 v -13.7 h 15 v -5.8 h -15 z m 39.3 -7.8 v 7.8 h 15.1 v 5.8 h -15.1 v 13.7 h -7 v -33.3 h 23.5 v 6 h -16.5 z m 29.7 0 v 7.8 h 14.9 v 5.8 h -14.9 v 13.7 h -7 v -33.3 h 23.4 v 6 h -16.4 z m 40.4 3.9 c -0.4 -3.4 -2.4 -5 -6.4 -5 c -3.5 0 -5.6 1.5 -5.6 3.9 c 0 2 1.3 3.2 4.1 3.7 l 6 1.1 c 6.4 1.1 9.8 4.5 9.8 9.7 c 0 6.5 -5.3 10.7 -13.7 10.7 c -8.9 0 -14 -4.3 -14.1 -11.8 h 7 c 0.5 4.3 2.7 6.2 7.4 6.2 c 3.7 0 6.3 -1.9 6.3 -4.6 c 0 -2.1 -1.4 -3.4 -4.1 -3.9 l -5.5 -1 c -7 -1.3 -10.1 -4.3 -10.1 -9.6 c 0 -6.1 4.8 -10 12.9 -10 c 7.8 0 12.7 3.9 12.9 10.6 h -6.9 z"
          />
          <path id="sbb-logo__panel" stroke-width="1" d="M0 48H143V0H0V48Z" />
          <path
            id="sbb-logo__signet"
            d="m 86.7 40.5 h 9.6 l -12.6 -12.7 h 15.6 v 12.7 h 7.4 v -12.7 h 15.6 l -12.6 12.7 h 9.6 l 16.3 -16.5 l -16.3 -16.5 h -9.6 l 12.6 12.8 h -15.6 v -12.8 h -7.4 v 12.8 h -15.6 l 12.6 -12.8 h -9.6 l -16.3 16.5 l 16.3 16.5 z"
          />
        </svg>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-logo-cargo': SbbLogoCargoElement;
  }
}
