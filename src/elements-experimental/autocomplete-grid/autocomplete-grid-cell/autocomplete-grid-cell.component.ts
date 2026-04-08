import { SbbElement, boxSizingStyles } from '@sbb-esta/lyne-elements/core.js';
import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import style from './autocomplete-grid-cell.scss?inline';

/**
 * A wrapper component for autocomplete-grid action button.
 *
 * @slot - Use the unnamed slot to add a `sbb-autocomplete-grid-button` element.
 */
export class SbbAutocompleteGridCellElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-autocomplete-grid-cell';
  public static override readonly role = 'gridcell';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-autocomplete-grid-cell">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-cell': SbbAutocompleteGridCellElement;
  }
}
