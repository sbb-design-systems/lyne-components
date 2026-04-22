import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import {
  boxSizingStyles,
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbLinkBaseElement,
  SbbNegativeMixin,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';
import { miniButtonLabelStyle, miniButtonStyle } from '../common/button-common.ts';

import style from './mini-button-link.scss?inline';

/**
 * It displays an icon-only button enhanced with the SBB Design as link variant;
 * it's meant to be used within the `sbb-mini-button-group`.
 *
 * @slot - Use the unnamed slot to add a label to the mini-button.
 * @slot icon - Slot used to display the icon, if one is set
 */
export class SbbMiniButtonLinkElement extends SbbNegativeMixin(
  SbbIconNameMixin(SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement))),
) {
  public static override readonly elementName: string = 'sbb-mini-button-link';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    miniButtonStyle,
    miniButtonLabelStyle,
    unsafeCSS(style),
  ];

  protected override renderTemplate(): TemplateResult {
    return html`
      ${super.renderIconSlot()}
      <span class="sbb-mini-button__label">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button-link': SbbMiniButtonLinkElement;
  }
}
