import type { SbbAutocompleteBaseElement } from '@sbb-esta/lyne-elements/autocomplete.js';
import { SbbOptgroupBaseElement } from '@sbb-esta/lyne-elements/option/optgroup.js';
import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';

/**
 * It can be used as a container for one or more `sbb-autocomplete-grid-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`.
 */
export
@customElement('sbb-autocomplete-grid-optgroup')
class SbbAutocompleteGridOptgroupElement extends SbbOptgroupBaseElement {
  protected get options(): SbbAutocompleteGridOptionElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-option') ?? [],
    ) as SbbAutocompleteGridOptionElement[];
  }

  protected getAutocompleteParent(): SbbAutocompleteBaseElement | null {
    return this.closest?.<SbbAutocompleteBaseElement>('sbb-autocomplete-grid') || null;
  }

  protected setAttributeFromParent(): void {
    this.negative = !!this.closest(`:is(sbb-autocomplete-grid, sbb-form-field)[negative]`);
    this.toggleAttribute('data-negative', this.negative);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-optgroup': SbbAutocompleteGridOptgroupElement;
  }
}
