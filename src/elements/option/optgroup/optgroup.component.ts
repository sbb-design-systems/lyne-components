import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.ts';
import type { SbbOptionElement } from '../option.ts';

import { SbbOptgroupBaseElement } from './optgroup-base-element.ts';

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
      ? 'autocomplete'
      : this.closest?.('sbb-select')
        ? 'select'
        : null;
    this.applyStatePattern(variant, 'variant');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-optgroup': SbbOptGroupElement;
  }
}
