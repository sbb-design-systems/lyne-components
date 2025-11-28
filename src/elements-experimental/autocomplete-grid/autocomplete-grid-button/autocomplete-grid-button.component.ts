import { miniButtonStyle } from '@sbb-esta/lyne-elements/button/common.js';
import { SbbActionBaseElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbPropertyWatcherController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { hostAttributes } from '@sbb-esta/lyne-elements/core/decorators.js';
import { isEventPrevented } from '@sbb-esta/lyne-elements/core/eventing.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '@sbb-esta/lyne-elements/core/mixins.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { SbbIconNameMixin } from '@sbb-esta/lyne-elements/icon.js';
import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteGridOptgroupElement } from '../autocomplete-grid-optgroup.ts';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.ts';

let autocompleteButtonNextId = 0;

/**
 * It displays an icon-only button that can be used in `sbb-autocomplete-grid`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
export
@customElement('sbb-autocomplete-grid-button')
@hostAttributes({
  tabindex: null,
})
class SbbAutocompleteGridButtonElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbActionBaseElement)),
) {
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
