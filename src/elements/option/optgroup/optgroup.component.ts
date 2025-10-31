import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.js';
import type { SbbOptionElement } from '../option.js';

import { SbbOptgroupBaseElement } from './optgroup-base-element.js';

/**
 * It can be used as a container for one or more `sbb-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-option` elements to the `sbb-optgroup`.
 */
export
@customElement('sbb-optgroup')
class SbbOptGroupElement extends SbbOptgroupBaseElement {
  protected get options(): SbbOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-option') ?? []) as SbbOptionElement[];
  }

  protected getAutocompleteParent(): SbbAutocompleteBaseElement | null {
    return this.closest?.<SbbAutocompleteBaseElement>('sbb-autocomplete') || null;
  }

  protected setAttributeFromParent(): void {
    this.negative = !!this.closest?.(`:is(sbb-autocomplete, sbb-select, sbb-form-field)[negative]`);
    this.toggleState('negative', this.negative);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleState('multiple', !!this.closest('sbb-select[multiple]'));
    this._setVariantByContext();
  }

  private _setVariantByContext(): void {
    const variant = this.closest?.('sbb-autocomplete')
      ? 'variant-autocomplete'
      : this.closest?.('sbb-select')
        ? 'variant-select'
        : null;
    if (variant) {
      this.toggleState(variant, true);
    }
    this.internals.states.forEach((state) => {
      if (state.startsWith('variant-') && state !== variant) {
        this.internals.states.delete(state);
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-optgroup': SbbOptGroupElement;
  }
}
