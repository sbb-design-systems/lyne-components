import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';

import { SbbElement } from '../../core/base-elements.ts';
import { SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './option-hint.scss?lit&inline';

/**
 * Display a textual hint inside a `sbb-autocomplete` or a `sbb-select`.
 *
 * @slot - Use the unnamed slot to display the hint message.
 */
export class SbbOptionHintElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-option-hint';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-optgroup__icon-space"></div>
      <span class="sbb-option-hint">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-option-hint': SbbOptionHintElement;
  }
}
