import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbIconNameMixin,
  hostAttributes,
} from '../../core/common-behaviors';

import style from './step-label.scss?lit&inline';

import '../../icon';

/**
 * Combined with a `sbb-stepper`, it displays a step's label.
 *
 * @slot - Use the unnamed slot to provide a label.
 */

@hostAttributes({
  slot: 'step-label',
  role: 'tab',
})
@customElement('sbb-step-label')
export class SbbStepLabelElement extends SbbIconNameMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step-label">
        <div class="sbb-step-label__prefix">${this.renderIconSlot()}</div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-step-label': SbbStepLabelElement;
  }
}
