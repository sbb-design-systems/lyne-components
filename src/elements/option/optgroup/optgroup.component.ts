import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement, SbbAutocompleteElement } from '../../autocomplete.ts';
import { SbbAncestorWatcherController } from '../../core/controllers.ts';
import type { SbbSelectElement } from '../../select/select.component.ts';
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

  public constructor() {
    super();

    this.addController(
      new SbbAncestorWatcherController(this, () => this.closest('sbb-autocomplete'), {
        negative: (e) => this._handleNegativeChange(e),
      }),
    );

    this.addController(
      new SbbAncestorWatcherController(this, () => this.closest('sbb-select'), {
        multiple: (ancestor) => this.toggleState('multiple', ancestor.multiple),
        negative: (e) => this._handleNegativeChange(e),
      }),
    );
  }

  private _handleNegativeChange(ancestor: SbbAutocompleteElement | SbbSelectElement): void {
    this.toggleState('negative', ancestor.negative);

    // To update the sbb-divider we need a requestUpdate() here
    this.requestUpdate();
  }

  protected getAutocompleteParent(): SbbAutocompleteBaseElement | null {
    return this.closest?.<SbbAutocompleteBaseElement>('sbb-autocomplete') || null;
  }

  public override connectedCallback(): void {
    super.connectedCallback();

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
