import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement } from '../../core/base-elements.ts';
import {
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbNegativeMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import { miniButtonLabelStyle, miniButtonStyle } from '../common.ts';

import style from './mini-button-link.scss?lit&inline';

/**
 * It displays an icon-only button enhanced with the SBB Design as link variant;
 * it's meant to be used within the `sbb-mini-button-group`.
 *
 * @slot - Use the unnamed slot to add a label to the mini-button.
 * @slot icon - Slot used to display the icon, if one is set
 */
export
@customElement('sbb-mini-button-link')
class SbbMiniButtonLinkElement extends SbbNegativeMixin(
  SbbIconNameMixin(SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement))),
) {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    miniButtonStyle,
    miniButtonLabelStyle,
    style,
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
