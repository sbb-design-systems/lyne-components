import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements.js';
import { hostAttributes, slotState } from '../../core/decorators.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { isEventPrevented } from '../../core/eventing.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '../../core/mixins.js';
import { AgnosticMutationObserver } from '../../core/observers.js';
import { SbbIconNameMixin } from '../../icon.js';
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
  role: 'button',
  tabindex: null,
  'data-button': '',
})
@slotState()
export class SbbAutocompleteGridButtonElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbActionBaseElement)),
) {
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
  private _optionAttributeObserver = new AgnosticMutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = this.hasAttribute('data-group-disabled');
        setOrRemoveAttribute(this, 'aria-disabled', `${this.disabled || this._disabledFromGroup}`);
      }
    }
  });

  public constructor() {
    super();
    if (!isServer) {
      this.setupBaseEventHandlers();
      this.addEventListener('click', this._handleButtonClick);
    }
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
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
