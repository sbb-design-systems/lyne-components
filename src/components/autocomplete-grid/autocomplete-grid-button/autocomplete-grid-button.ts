import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbMiniButtonBaseElement } from '../../core/base-elements.js';
import { hostAttributes } from '../../core/decorators.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { SbbDisabledMixin } from '../../core/mixins.js';
import { AgnosticMutationObserver } from '../../core/observers.js';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';

import style from './autocomplete-grid-button.scss?lit&inline';

let autocompleteButtonNextId = 0;

/** Configuration for the attribute to look at if component is nested in a sbb-optgroup */
const buttonObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled'],
};

/**
 * It displays an icon-only button that can be used in `sbb-autocomplete-grid`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-autocomplete-grid-button')
@hostAttributes({
  tabindex: null,
})
export class SbbAutocompleteGridButtonElement extends SbbDisabledMixin(SbbMiniButtonBaseElement) {
  public static override styles: CSSResultGroup = style;

  /** Gets the SbbAutocompleteGridOptionElement on the same row of the button. */
  public get option(): SbbAutocompleteGridOptionElement | null {
    return (
      this.closest('sbb-autocomplete-grid-row')?.querySelector('sbb-autocomplete-grid-option') ||
      null
    );
  }

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  private _disabledFromGroup = false;

  protected override isDisabledExternally(): boolean {
    return this._disabledFromGroup ?? false;
  }

  /** MutationObserver on data attributes. */
  private _optionAttributeObserver = new AgnosticMutationObserver((mutationsList) =>
    this._onOptionAttributesChange(mutationsList),
  );

  /** Observe changes on data attributes and set the appropriate values. */
  private _onOptionAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = this.hasAttribute('data-group-disabled');
        setOrRemoveAttribute(this, 'aria-disabled', `${this.disabled || this._disabledFromGroup}`);
      }
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-autocomplete-grid-button-${++autocompleteButtonNextId}`;
    const parentGroup = this.closest('sbb-autocomplete-grid-optgroup');
    if (parentGroup) {
      this._disabledFromGroup = parentGroup.disabled;
      setOrRemoveAttribute(this, 'aria-disabled', `${this.disabled || this._disabledFromGroup}`);
    }
    this._optionAttributeObserver.observe(this, buttonObserverConfig);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      setOrRemoveAttribute(this, 'aria-disabled', `${this.disabled || this._disabledFromGroup}`);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._optionAttributeObserver.disconnect();
  }

  /**
   * Used to dispatch a click event when users interact with the button via keyboard (the component does not receive focus).
   */
  public dispatchClick(event: KeyboardEvent): void {
    return this.dispatchClickEvent(event);
  }

  /**
   * Event needs to be dispatched from the action element; in autocomplete-grid,
   * the input has always the focus, so the `event.target` on parent class is the input and not the button.
   */
  protected override dispatchClickEvent = (event: KeyboardEvent): void => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    this.dispatchEvent(
      new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: -1,
        pointerType: '',
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      }),
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-button': SbbAutocompleteGridButtonElement;
  }
}
