import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteElement } from '../../autocomplete.js';
import { hostAttributes } from '../../core/decorators.js';
import { isSafari } from '../../core/dom.js';
import type { SbbOptionElement } from '../option.js';

import { SbbOptgroupBaseElement } from './optgroup-base-element.js';

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add a hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari();

/**
 * It can be used as a container for one or more `sbb-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-option` elements to the `sbb-optgroup`.
 */
@customElement('sbb-optgroup')
@hostAttributes({ role: !inertAriaGroups ? 'group' : null })
export class SbbOptGroupElement extends SbbOptgroupBaseElement {
  protected get options(): SbbOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-option') ?? []) as SbbOptionElement[];
  }

  protected getAutocompleteParent(): SbbAutocompleteElement | null {
    return this.closest?.('sbb-autocomplete') || null;
  }

  protected setAttributeFromParent(): void {
    this.negative = !!this.closest?.(`:is(sbb-autocomplete, sbb-select, sbb-form-field)[negative]`);
    this.toggleAttribute('data-negative', this.negative);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleAttribute('data-multiple', !!this.closest('sbb-select[multiple]'));
    this._setVariantByContext();
  }

  private _setVariantByContext(): void {
    if (this.closest?.('sbb-autocomplete')) {
      this.setAttribute('data-variant', 'autocomplete');
    } else if (this.closest?.('sbb-select')) {
      this.setAttribute('data-variant', 'select');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-optgroup': SbbOptGroupElement;
  }
}
