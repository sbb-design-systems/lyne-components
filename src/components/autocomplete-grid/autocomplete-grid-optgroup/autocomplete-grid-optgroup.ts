import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators/index.js';
import { isSafari } from '../../core/dom/index.js';
import { SbbOptgroupBaseElement } from '../../option/optgroup/index.js';
import type { SbbAutocompleteGridElement } from '../autocomplete-grid/index.js';
import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button/index.js';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option/index.js';

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add a hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari();

/**
 * It can be used as a container for one or more `sbb-autocomplete-grid-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`.
 */
@customElement('sbb-autocomplete-grid-optgroup')
@hostAttributes({ role: !inertAriaGroups ? 'group' : null })
export class SbbAutocompleteGridOptgroupElement extends SbbOptgroupBaseElement {
  protected get options(): SbbAutocompleteGridOptionElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-option') ?? [],
    ) as SbbAutocompleteGridOptionElement[];
  }

  private get _buttons(): SbbAutocompleteGridButtonElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-button') ?? [],
    ) as SbbAutocompleteGridButtonElement[];
  }

  protected getAutocompleteParent(): SbbAutocompleteGridElement | null {
    return this.closest?.('sbb-autocomplete-grid') || null;
  }

  protected setAttributeFromParent(): void {
    this.negative = !!this.closest(`:is(sbb-autocomplete-grid, sbb-form-field)[negative]`);
    this.toggleAttribute('data-negative', this.negative);
  }

  protected override proxyDisabledToOptions(): void {
    super.proxyDisabledToOptions();
    for (const el of this._buttons) {
      el.toggleAttribute('data-group-disabled', this.disabled);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-optgroup': SbbAutocompleteGridOptgroupElement;
  }
}
