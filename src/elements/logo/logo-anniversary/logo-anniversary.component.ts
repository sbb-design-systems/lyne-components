import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, SbbElement, SbbNegativeMixin } from '../../core.ts';

import style from './logo-anniversary.scss?inline';

/**
 * SBB 125 years anniversary logo
 *
 * @cssprop [--sbb-logo-height=auto] - Can be used to set the height of the logo.
 */
export class SbbLogoAnniversaryElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-logo-anniversary';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** Visual protective room around logo. */
  @property({ attribute: 'protective-room', reflect: true })
  public accessor protectiveRoom: 'none' | 'minimal' | 'ideal' = 'ideal';

  /** Accessibility label which will be forwarded to the SVG logo. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = 'Logo';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-logo__svg-container">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 454 90">
          <title .textContent=${this.accessibilityLabel}></title>
          <defs>
            <clipPath id="sbb-logo-letter-mask">
              <rect x="90" y="0" width="364" height="90" />
            </clipPath>
          </defs>
          <g id="sbb-logo-125">
            <rect id="sbb-logo-125-1" x="226" width="75" height="35" rx="6" y="5.89"></rect>
            <rect id="sbb-logo-125-2" x="316" width="125" height="34.21" rx="6" y="6.69"></rect>
            <rect id="sbb-logo-125-3" x="446.46" width="7.59" height="7.43" y="32.67"></rect>
          </g>
          <g id="sbb-logo__word-mark">
            <path
              id="sbb-logo__word-mark-1"
              d="M238.2 34.6c4.1 0 6.2-1.4 6.2-4.5 0-3.2-2-4.6-6.6-4.6h-7v9h7.4zm-.4-14.4c3.5 0 5.6-1.4 5.6-3.8 0-2.7-1.9-4-5.7-4h-7v7.8h7.1zm1.1-13.4c7.3 0 11.4 3.1 11.4 8.5 0 3-1.4 5.1-4.6 6.9 4.1 1.5 5.9 4.1 5.9 8.5 0 5.9-4.6 9.6-11.9 9.6h-15.9V6.8h15.1zm-33.7 27.8c4.1 0 6.2-1.4 6.2-4.5 0-3.2-2-4.6-6.6-4.6H198v9h7.2zm-.3-14.4c3.5 0 5.6-1.4 5.6-3.8 0-2.7-1.9-4-5.7-4H198v7.8h6.9zM206 6.8c7.3 0 11.4 3.1 11.4 8.5 0 3-1.4 5.1-4.6 6.9 4.1 1.5 5.9 4.1 5.9 8.5 0 5.9-4.6 9.6-11.9 9.6H191V6.8h15zm-28 9.9c-.4-3.4-2.4-5-6.5-5-3.4 0-5.6 1.5-5.6 3.9 0 2 1.3 3.2 4.1 3.7l6 1c6.4 1.1 9.8 4.6 9.8 9.7 0 6.6-5.3 10.8-13.7 10.8-8.9 0-14.1-4.3-14.1-11.9h7.1c.4 4.4 2.6 6.2 7.3 6.2 3.6 0 6.2-1.9 6.2-4.6 0-2.1-1.4-3.4-4.1-3.9l-5.5-1c-7-1.3-10.2-4.3-10.2-9.7 0-6.2 4.9-10 12.9-10 7.8 0 12.7 4 12.9 10.6l-6.6.2"
            ></path>
            <path
              id="sbb-logo__word-mark-2"
              d="M295.5 28.5h-7.1c-.8 4.6-3.2 6.7-7.5 6.7-5.2 0-8.6-4.6-8.6-11.6S275.8 12 281.1 12c3.9 0 6.3 1.9 7.1 5.7h7c-.6-7.1-6-11.6-14.1-11.6-9.3 0-15.7 7-15.7 17.5 0 10.6 6.2 17.4 15.6 17.4 8.3 0 14-4.8 14.5-12.5m11.8-15.7h16.3v-6H300.3V40.1h7V26.4h14.8V20.6H307.3V12.8Zm29.4 0h16.5v-6H329.7V40.1h7V26.4h15V20.6h-15V12.8Z"
            ></path>
            <path
              id="sbb-logo__word-mark-3"
              d="M307.3 12.8zm-11.8 15.7zm150.7-11.8c-.4-3.4-2.4-5-6.5-5-3.4 0-5.6 1.5-5.6 3.9 0 2 1.3 3.2 4.1 3.7l6 1c6.4 1.1 9.8 4.6 9.8 9.7 0 6.6-5.3 10.8-13.7 10.8-8.9 0-14-4.3-14.1-11.9h7.1c.4 4.4 2.6 6.2 7.3 6.2 3.7 0 6.2-1.9 6.2-4.6 0-2.1-1.4-3.4-4.1-3.9l-5.5-1c-7-1.3-10.2-4.3-10.2-9.7 0-6.2 4.9-10 12.9-10 7.8 0 12.7 4 13 10.6l-6.7.2zm-40.4-3.9v7.8h14.9v5.8h-14.9v13.7h-7V6.8h23.4v6h-16.4zm-29.7 0v7.8h15v5.8h-15v13.7h-7V6.8h23.5v6h-16.5z"
            ></path>
          </g>
          <path id="sbb-logo__panel" stroke-width="1" d="M1 47h141V1H1v46z"></path>
          <path
            id="sbb-logo__signet"
            d="M87 40h9.3L83.8 27.7h15.5V40h7.4V27.7h15.6L109.7 40h9.3l16-16-15.9-16h-9.3l12.5 12.3h-15.6V8h-7.4v12.3H83.8L96.3 8H87L71 24l16 16z"
          ></path>

          <rect id="sbb-logo__claim" x="0" width="454" height="16.7" rx="6" y="68.68"></rect>
        </svg>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-logo-anniversary': SbbLogoAnniversaryElement;
  }
}
