import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './table-wrapper.scss?lit&inline';

/**
 * Wraps a table to enhance its functionality
 *
 * @slot - Use the unnamed slot to add the table.
 */
@customElement('sbb-table-wrapper')
export class SbbTableWrapperElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`<div class="sbb-table-wrapper">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-table-wrapper': SbbTableWrapperElement;
  }
}
