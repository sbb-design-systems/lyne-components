import { SbbElementInternalsMixin } from '@sbb-esta/lyne-elements/core/mixins.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './autocomplete-grid-cell.scss?lit&inline';

/**
 * A wrapper component for autocomplete-grid action button.
 *
 * @slot - Use the unnamed slot to add a `sbb-autocomplete-grid-button` element.
 */
export
@customElement('sbb-autocomplete-grid-cell')
class SbbAutocompleteGridCellElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'gridcell';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

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
