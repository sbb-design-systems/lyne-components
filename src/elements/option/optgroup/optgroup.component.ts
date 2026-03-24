import type {
  SbbAutocompleteBaseElement,
  SbbAutocompleteElement,
} from '../../autocomplete.pure.ts';
import { SbbPropertyWatcherController } from '../../core.ts';
import type { SbbSelectElement } from '../../select/select.component.ts';
import type { SbbOptionElement } from '../option/option.component.ts';

import { SbbOptgroupBaseElement } from './optgroup-base-element.ts';

/**
 * It can be used as a container for one or more `sbb-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-option` elements to the `sbb-optgroup`.
 */
export class SbbOptGroupElement extends SbbOptgroupBaseElement {
  public static override readonly elementName: string = 'sbb-optgroup';
  protected get options(): SbbOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-option') ?? []) as SbbOptionElement[];
  }

  public constructor() {
    super();

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete'), {
        negative: (e) => this._handleNegativeChange(e),
      }),
    );

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-select'), {
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
    this.internals.states.delete('variant-autocomplete');
    this.internals.states.delete('variant-select');
    if (variant) {
      this.internals.states.add(`variant-${variant}`);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-optgroup': SbbOptGroupElement;
  }
}
