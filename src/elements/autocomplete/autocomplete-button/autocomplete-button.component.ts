import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';

import { miniButtonStyle } from '../../button.pure.ts';
import {
  SbbActionBaseElement,
  SbbDisabledMixin,
  SbbNegativeMixin,
  SbbPropertyWatcherController,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';
import type { SbbOptGroupElement, SbbOptionElement } from '../../option.pure.ts';

let autocompleteButtonNextId = 0;

/**
 * It displays an icon-only button that can be used in a `sbb-autocomplete-row`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
export class SbbAutocompleteButtonElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbActionBaseElement)),
) {
  public static override readonly elementName: string = 'sbb-autocomplete-button';
  public static override readonly role = 'button';
  public static override styles: CSSResultGroup = [miniButtonStyle];

  /** Gets the SbbOptionElement on the same row of the button. */
  public get option(): SbbOptionElement | null {
    return this.closest('sbb-autocomplete-row')?.querySelector(
      'sbb-option',
    ) as SbbOptionElement | null;
  }

  /** Gets the parent SbbOptGroupElement, if present. */
  public get optgroup(): SbbOptGroupElement | null {
    return this.closest('sbb-optgroup');
  }

  public constructor() {
    super();
    this.internals.states.add('button');
    if (!isServer) {
      this.setupBaseEventHandlers();
      this.addController(
        new SbbPropertyWatcherController(this, () => this.closest('sbb-optgroup'), {
          disabled: () => this._updateInternals(),
        }),
      );
    }
  }

  /**
   * Whether the button is currently active.
   * @internal
   */
  public setActive(value: boolean): void {
    this.toggleState('focus-visible', value);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-autocomplete-button-${++autocompleteButtonNextId}`;
    this.removeAttribute('tabindex');
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      this._updateInternals();
    }
  }

  protected override isDisabledExternally(): boolean {
    return this.optgroup?.disabled ?? false;
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

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-button': SbbAutocompleteButtonElement;
  }
}
