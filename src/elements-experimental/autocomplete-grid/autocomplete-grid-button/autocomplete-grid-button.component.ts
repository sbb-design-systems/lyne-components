import { miniButtonStyle } from '@sbb-esta/lyne-elements/button.pure.js';
import {
  boxSizingStyles,
  hostAttributes,
  isEventPrevented,
  SbbActionBaseElement,
  SbbDisabledMixin,
  SbbNegativeMixin,
  SbbPropertyWatcherController,
} from '@sbb-esta/lyne-elements/core.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-elements/icon.pure.js';
import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';

import type { SbbAutocompleteGridOptgroupElement } from '../autocomplete-grid-optgroup/autocomplete-grid-optgroup.component.ts';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option/autocomplete-grid-option.component.ts';

let autocompleteButtonNextId = 0;

/**
 * It displays an icon-only button that can be used in `sbb-autocomplete-grid`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
export
@hostAttributes({
  tabindex: null,
})
class SbbAutocompleteGridButtonElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbActionBaseElement)),
) {
  public static override readonly elementName: string = 'sbb-autocomplete-grid-button';
  public static override readonly role = 'button';
  public static override styles: CSSResultGroup = [boxSizingStyles, miniButtonStyle];

  /** Gets the SbbAutocompleteGridOptionElement on the same row of the button. */
  public get option(): SbbAutocompleteGridOptionElement | null {
    return (
      this.closest('sbb-autocomplete-grid-row')?.querySelector('sbb-autocomplete-grid-option') ||
      null
    );
  }

  public get optgroup(): SbbAutocompleteGridOptgroupElement | null {
    return this.closest('sbb-autocomplete-grid-optgroup');
  }

  public constructor() {
    super();
    this.internals.states.add('button');
    if (!isServer) {
      this.setupBaseEventHandlers();
      this.addEventListener('click', this._handleButtonClick);
      this.addController(
        new SbbPropertyWatcherController(
          this,
          () => this.closest('sbb-autocomplete-grid-optgroup'),
          {
            disabled: () => this._updateInternals(),
          },
        ),
      );
    }
  }

  protected override isDisabledExternally(): boolean {
    return this.optgroup?.disabled ?? false;
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-autocomplete-grid-button-${++autocompleteButtonNextId}`;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      this._updateInternals();
    }
  }

  private _updateInternals(): void {
    if (this.disabled || this.optgroup?.disabled) {
      this.internals.states.add('disabled');
      this.internals.ariaDisabled = 'true';
    } else {
      this.internals.states.delete('disabled');
      this.internals.ariaDisabled = null;
    }
  }

  private _handleButtonClick = async (event: MouseEvent): Promise<void> => {
    if ((await isEventPrevented(event)) || !this.closest('form')) {
      return;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-button': SbbAutocompleteGridButtonElement;
  }
}
