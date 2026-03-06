import type { SbbAutocompleteBaseElement } from '@sbb-esta/lyne-elements/autocomplete.js';
import { SbbPropertyWatcherController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { SbbOptgroupBaseElement } from '@sbb-esta/lyne-elements/option.pure.js';

import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option/autocomplete-grid-option.component.ts';

/**
 * It can be used as a container for one or more `sbb-autocomplete-grid-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`.
 */
export class SbbAutocompleteGridOptgroupElement extends SbbOptgroupBaseElement {
  public static override readonly elementName: string = 'sbb-autocomplete-grid-optgroup';
  protected get options(): SbbAutocompleteGridOptionElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-option') ?? [],
    ) as SbbAutocompleteGridOptionElement[];
  }

  public constructor() {
    super();

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete-grid'), {
        negative: (e) => {
          this.toggleState('negative', e.negative);

          // To update the sbb-divider we need a requestUpdate() here
          this.requestUpdate();
        },
      }),
    );
  }

  protected getAutocompleteParent(): SbbAutocompleteBaseElement | null {
    return this.closest?.<SbbAutocompleteBaseElement>('sbb-autocomplete-grid') || null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-optgroup': SbbAutocompleteGridOptgroupElement;
  }
}
