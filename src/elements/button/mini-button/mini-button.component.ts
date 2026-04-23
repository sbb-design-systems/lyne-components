import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import {
  boxSizingStyles,
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbNegativeMixin,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';
import { miniButtonLabelStyle, miniButtonStyle } from '../common/button-common.ts';

/**
 * It displays an icon-only button enhanced with the SBB Design;
 * it's meant to be used mainly within the sbb-form-field in prefix/suffix slot
 * or the `sbb-mini-button-group`. *
 * @slot - Use the unnamed slot to add a label to the mini-button.
 * @slot icon - Slot used to display the icon, if one is set
 */
export class SbbMiniButtonElement extends SbbDisabledTabIndexActionMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbButtonBaseElement)),
) {
  public static override readonly elementName: string = 'sbb-mini-button';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    miniButtonStyle,
    miniButtonLabelStyle,
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
    'sbb-mini-button': SbbMiniButtonElement;
  }
}
