import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbIconNameMixin,
} from '../../core/common-behaviors';
import { SbbMiniButtonCommonElementMixin } from '../common/button-common';
import commonStyle from '../common/button-common.scss?lit&inline';

import style from './mini-button.scss?lit&inline';

/**
 * It displays an icon-only button enhanced with the SBB Design;
 * it's meant to be used mainly within the sbb-form-field in prefix/suffix slot.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-mini-button')
export class SbbMiniButtonElement extends SbbMiniButtonCommonElementMixin(
  SbbIconNameMixin(SbbDisabledTabIndexActionMixin(SbbButtonBaseElement)),
) {
  public static override styles: CSSResultGroup = [commonStyle, style];

  protected override renderIcon(): TemplateResult {
    return html`${super.renderIconSlot()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button': SbbMiniButtonElement;
  }
}
