import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import { hostContext, isValidAttribute, toggleDatasetEntry } from '../../core/dom';

import style from './popover-trigger.scss?lit&inline';
import '../../icon';

/**
 * It can be used as a trigger for the `sbb-popover` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-popover-trigger`.
 */
@customElement('sbb-popover-trigger')
export class SbbPopoverTriggerElement extends SbbDisabledTabIndexActionMixin(
  SbbNegativeMixin(SbbButtonBaseElement),
) {
  public static override styles: CSSResultGroup = style;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName = 'circle-information-small';

  public override connectedCallback(): void {
    super.connectedCallback();
    const formField = hostContext('sbb-form-field', this) ?? hostContext('[data-form-field]', this);

    if (formField) {
      toggleDatasetEntry(this, 'iconSmall', true);
      this.negative = isValidAttribute(formField as HTMLElement, 'negative');
    }
  }

  protected renderTemplate(): TemplateResult {
    return html`
      <span class="sbb-popover-trigger">
        <slot>${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover-trigger': SbbPopoverTriggerElement;
  }
}
