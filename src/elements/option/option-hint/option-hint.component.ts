import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './option-hint.scss?lit&inline';

/**
 * Display a textual hint inside a `sbb-autocomplete` or a `sbb-select`.
 *
 * @slot - Use the unnamed slot to display the hint message.
 */
export
@customElement('sbb-option-hint')
class SbbOptionHintElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-option-hint__wrapper">
        <div class="sbb-optgroup__icon-space"></div>
        <span class="sbb-option-hint">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-option-hint': SbbOptionHintElement;
  }
}
