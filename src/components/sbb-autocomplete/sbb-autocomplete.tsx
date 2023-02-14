import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import { hostContext } from '../../global/helpers/host-context';
import { getElementPosition } from '../../global/helpers/position';

type SbbAutocompleteState = 'closed' | 'opening' | 'opened' | 'closing';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-autocomplete.scss',
  tag: 'sbb-autocomplete',
})
export class SbbAutocomplete implements ComponentInterface {
  /**
   * The element where the autocomplete will attach.
   * Accepts both a string (id of an element) or an HTML element.
   * 
   * If not setted, will search for the first 'sbb-form-field' ancestor
   */
  @Prop() public origin: string | HTMLElement;

  /**
   * The element that will trigger the autocomplete opening.
   * Accepts both a string (id of an element) or an HTML element.
   * 
   * If not setted, will search for the first 'input' child of 'origin'
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * The state of the menu.
   */
  @State() private _state: SbbAutocompleteState = 'closed';

    /**
   * Emits whenever the menu starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the menu is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the menu begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the menu is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element!: HTMLElement;

  private _dialog: HTMLDialogElement;
  private _originElement: HTMLElement;
  private _triggerElement: HTMLElement;
  // private _contentElement: HTMLElement;

  /**
   * Opens the autocomplete on trigger click.
   */
  @Method()
  public async open(): Promise<void> {
    // if (this._state === 'closing' || !this._dialog) {
    //   return;
    // }

    this.willOpen.emit();
    this._state = 'opened';
    this._setOverlayPosition();
    this._dialog.show();
  }

  /**
   * Closes the autocomplete.
   */
  @Method()
  public async close(): Promise<void> {
    // if (this._state === 'opening') {
    //   return;
    // }

    this.willClose.emit();
    // this._state = 'closed';
    // this._dialog.close();
    // this._openedByKeyboard = false;
  }
  
  public connectedCallback(): void {
    // TODO watch for pros change
    this._attachTo(this._getOriginElement());
    this._bindTo(this._getTriggerElement());
  }

  /**
   * Retrieve the element where the autocomplete will be attached
   * @returns 'anchor' or the first 'sbb-form-field' ancestor
   */
  private _getOriginElement(): HTMLElement {
    if (!this.origin) {
      return hostContext('sbb-form-field', this._element) as HTMLSbbFormFieldElement;
    }

    return typeof this.origin === 'string'
      ? document.getElementById(this.origin)
      : this.origin;
  }

  /**
   * Retrieve the element that will trigger the autocomplete opening
   * @returns 'trigger' or the first 'input' inside the origin element
   */
  private _getTriggerElement(): HTMLElement {
    if (!this.trigger) {
      return this._originElement?.querySelector('input') as HTMLInputElement;
    }

    return typeof this.trigger === 'string'
      ? document.getElementById(this.trigger)
      : this.trigger;
  }

  private _attachTo(anchorElem: HTMLElement): void {
    if (!anchorElem) {
      return;
    }
    this._originElement = anchorElem;
  }

  private _bindTo(triggerElem: HTMLElement): void {
    if (!triggerElem) {
      return;
    }
    this._triggerElement = triggerElem;
    
    // TODO listen to events on the trigger (open, valuechange, etc.)
    this._triggerElement.addEventListener('focus', (ev) => {console.log('open', ev); this.open();});
    this._triggerElement.addEventListener('blur', (ev) => console.log('close', ev));
  }

  // Set overlay position, width and max height
  private _setOverlayPosition(): void {
    if (!this._dialog || !this._originElement) {
      return;
    }

    // Set the width to match the trigger element
    this._element.style.setProperty('--sbb-overlay-width', `${this._originElement.offsetWidth}px`);

    // Calculate and set the position
    const panelPosition = getElementPosition(this._dialog, this._originElement);

    this._element.style.setProperty('--sbb-overlay-position-x', `${panelPosition.left}px`);
    this._element.style.setProperty('--sbb-overlay-position-y', `${panelPosition.top}px`);
    this._element.style.setProperty('--sbb-overlay-max-height', panelPosition.maxHeight);
  }

  public render(): JSX.Element {
    return (
      <Host data-state={this._state}>
        <div class="sbb-autocomplete__container">
          <dialog
            ref={(dialogRef) => (this._dialog = dialogRef)}
            class="sbb-autocomplete__panel">
            <div
              // ref={(menuContentRef) => (this._contentElement = menuContentRef)}
            >
              <slot />
            </div>
          </dialog>
        </div>
      </Host>
    );
  }
}
