import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbIconNameMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import { hostContext, isValidAttribute, toggleDatasetEntry } from '../../core/dom';

import '../../icon';
import style from './popover-trigger.scss?lit&inline';

/**
 * It can be used as a trigger for the `sbb-popover` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-popover-trigger`.
 */
@customElement('sbb-popover-trigger')
export class SbbPopoverTriggerElement extends SbbDisabledTabIndexActionMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbButtonBaseElement)),
) {
  public static override styles: CSSResultGroup = style;

  public override connectedCallback(): void {
    super.connectedCallback();
    const formField = hostContext('sbb-form-field', this) ?? hostContext('[data-form-field]', this);

    if (formField) {
      toggleDatasetEntry(this, 'iconSmall', true);
      this.negative = isValidAttribute(formField as HTMLElement, 'negative');
    }
  }

  protected override renderIconSlot(): TemplateResult {
    return html`
      <slot>
        <sbb-icon name=${this.iconName || 'circle-information-small'}></sbb-icon>
      </slot>
    `;
  }

  protected override renderTemplate(): TemplateResult {
    return this.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover-trigger': SbbPopoverTriggerElement;
  }
}
