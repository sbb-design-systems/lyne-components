import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  NamedSlotStateController,
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbIconNameMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import commonStyle from '../common/button-common.scss?lit&inline';
import style from '../common/mini-button.scss?lit&inline';

/**
 * It displays an icon-only button enhanced with the SBB Design;
 * it's meant to be used mainly within the sbb-form-field in prefix/suffix slot.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-mini-button')
export class SbbMiniButtonElement extends SbbNegativeMixin(
  SbbIconNameMixin(SbbDisabledTabIndexActionMixin(SbbButtonBaseElement)),
) {
  public static override styles: CSSResultGroup = [commonStyle, style];

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  protected override renderTemplate(): TemplateResult {
    return html`<span class="sbb-button__icon"> ${super.renderIconSlot()} </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button': SbbMiniButtonElement;
  }
}
