import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators.js';
import { SbbDisabledTabIndexActionMixin, SbbNegativeMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';

import style from './mini-button.scss?lit&inline';

/**
 * It displays an icon-only button enhanced with the SBB Design;
 * it's meant to be used mainly within the sbb-form-field in prefix/suffix slot.
 *
 * @slot - Use the unnamed slot to add a label to the mini-button.
 * @slot icon - Slot used to display the icon, if one is set
 */
export
@customElement('sbb-mini-button')
@slotState()
class SbbMiniButtonElement extends SbbDisabledTabIndexActionMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbButtonBaseElement)),
) {
  public static override styles: CSSResultGroup = style;

  protected override renderTemplate(): TemplateResult {
    return html`
      ${super.renderIconSlot()}
      <span class="sbb-button__label">
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
