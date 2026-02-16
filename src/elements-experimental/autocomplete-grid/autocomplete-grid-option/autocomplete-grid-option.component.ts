import { SbbPropertyWatcherController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { ɵstateController } from '@sbb-esta/lyne-elements/core/mixins.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { SbbOptionBaseElement } from '@sbb-esta/lyne-elements/option.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './autocomplete-grid-option.scss?lit&inline';

export const autocompleteGridOptionId: string = `sbb-autocomplete-grid-option`;

/**
 * It displays an option item which can be used in `sbb-autocomplete-grid`.
 *
 * @slot - Use the unnamed slot to add content to the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @cssprop [--sbb-option-icon-container-display=none] - Can be used to reserve space even
 * when preserve-icon-space on autocomplete is not set or iconName is not set.
 * @overrideType value - T = string
 */
export
@customElement('sbb-autocomplete-grid-option')
class SbbAutocompleteGridOptionElement<T = string> extends SbbOptionBaseElement<T> {
  public static override readonly role = 'gridcell';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  protected optionId = autocompleteGridOptionId;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete-grid-optgroup'), {
        disabled: (p) => {
          this.disabledFromGroup = p.disabled;
          ɵstateController(this.closest?.('sbb-autocomplete-grid-row'))?.toggle(
            'disabled',
            this.disabled || this.disabledFromGroup,
          );
          this.updateAriaDisabled();
        },
        label: (p) => (this.groupLabel = p.label),
      }),
    );

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete-grid'), {
        negative: (e) => this.toggleState('negative', e.negative),
      }),
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      ɵstateController(this.closest?.('sbb-autocomplete-grid-row'))?.toggle(
        'disabled',
        this.disabled || this.disabledFromGroup,
      );
      this.updateAriaDisabled();
    }
  }

  protected selectByClick(event: MouseEvent): void {
    if (this.disabled || this.disabledFromGroup) {
      event.stopPropagation();
      return;
    }

    this.selectViaUserInteraction(true);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-option': SbbAutocompleteGridOptionElement;
  }
}
