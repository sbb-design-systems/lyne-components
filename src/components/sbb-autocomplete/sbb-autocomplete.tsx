import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { getNextElementIndex } from '../../global/helpers/arrow-navigation';
import {
  removeAriaComboBoxAttributes,
  setAriaComboBoxAttributes,
} from '../../global/helpers/overlay-trigger-attributes';
import { isEventOnElement } from '../../global/helpers/position';
import { SbbOptionEventData } from '../sbb-option/sbb-option.custom';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { SbbOverlayState, overlayGapFixCorners } from '../../global/helpers/overlay';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import {
  attachOpenPanelEvents,
  setOverlayPosition,
} from '../../global/helpers/overlay-option-panel';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to project options.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-autocomplete.scss',
  tag: 'sbb-autocomplete',
})
export class SbbAutocomplete implements ComponentInterface {
  /**
   * The element where the autocomplete will attach; accepts both an element's id or an HTMLElement.
   * If not set, will search for the first 'sbb-form-field' ancestor.
   */
  @Prop() public origin: string | HTMLElement;

  /**
   * The input element that will trigger the autocomplete opening; accepts both an element's id or an HTMLElement.
   * By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element.
   * If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor.
   */
  @Prop() public trigger: string | HTMLInputElement;

  /** Whether the animation is disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  /** Whether the icon space is preserved when no icon is set. */
  @Prop({ reflect: true }) public preserveIconSpace: boolean;

  /** The state of the autocomplete. */
  @State() private _state: SbbOverlayState = 'closed';

  /** Emits whenever the autocomplete starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the autocomplete is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element!: HTMLElement;

  private _dialog: HTMLElement;
  private _optionContainer: HTMLElement;
  private _originElement: HTMLElement;
  private _triggerElement: HTMLInputElement;
  private _triggerEventsController: AbortController;
  private _openPanelEventsController: AbortController;
  private _overlayId = `sbb-autocomplete-${++nextId}`;
  private _activeItemIndex = -1;
  private _didLoad = false;

  private get _options(): HTMLSbbOptionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-option')) as HTMLSbbOptionElement[];
  }

  /** Opens the autocomplete. */
  @Method()
  public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._dialog || this._options.length === 0) {
      return;
    }

    this._state = 'opening';
    this.willOpen.emit();
    this._setOverlayPosition();
    toggleDatasetEntry(this._originElement, 'overlayOpen', true);
  }

  /** Closes the autocomplete. */
  @Method()
  public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    toggleDatasetEntry(this._originElement, 'overlayOpen', false);
    this._state = 'closing';
    this.willClose.emit();
    this._openPanelEventsController.abort();
  }

  /** Removes trigger click listener on trigger change. */
  @Watch('origin')
  public resetOriginClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._componentSetup();
    }
  }

  /** Removes trigger click listener on trigger change. */
  @Watch('trigger')
  public resetTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._componentSetup();
    }
  }

  /** When an option is selected, update the input value and close the autocomplete. */
  @Listen('option-selection-change')
  public onOptionSelected(event: CustomEvent<SbbOptionEventData>): void {
    if (!event.detail.selected) {
      return;
    }

    // Deselect the previous options
    this._options
      .filter((option) => option.id !== event.detail.id)
      .forEach((option) => (option.selected = false));

    // Set the option value
    this._triggerElement.value = event.detail.value;

    // Manually trigger the change events
    this._triggerElement.dispatchEvent(
      new window.Event('change', { bubbles: true, composed: false })
    );
    this._triggerElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    this.close();
  }

  @Listen('option-click')
  public onOptionClick(): void {
    this.close();
  }

  public componentDidLoad(): void {
    this._componentSetup();
    this._didLoad = true;
  }

  public connectedCallback(): void {
    if (this._didLoad) {
      this._componentSetup();
    }
  }

  public disconnectedCallback(): void {
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();
  }

  private _componentSetup(): void {
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();

    this._attachTo(this._getOriginElement());
    this._bindTo(this._getTriggerElement());
  }

  /**
   * Retrieve the element where the autocomplete will be attached.
   * @returns 'origin' or the first 'sbb-form-field' ancestor.
   */
  private _getOriginElement(): HTMLElement {
    let result: HTMLElement;

    if (!this.origin) {
      result = this._element
        .closest('sbb-form-field')
        ?.shadowRoot.querySelector('#form-field-wrapper');
    } else {
      result = typeof this.origin === 'string' ? document.getElementById(this.origin) : this.origin;
    }

    if (!result) {
      throw new Error(
        'Cannot find the origin element. Please specify a valid element or read the "origin" prop documentation'
      );
    }

    return result;
  }

  /**
   * Retrieve the element that will trigger the autocomplete opening.
   * @returns 'trigger' or the first 'input' inside the origin element.
   */
  private _getTriggerElement(): HTMLInputElement {
    if (!this.trigger) {
      return this._element.closest('sbb-form-field')?.querySelector('input') as HTMLInputElement;
    }

    const result =
      typeof this.trigger === 'string'
        ? (document.getElementById(this.trigger) as HTMLInputElement)
        : this.trigger;

    if (!result) {
      throw new Error(
        'Cannot find the trigger element. Please specify a valid element or read the "trigger" prop documentation'
      );
    }

    return result;
  }

  private _attachTo(anchorElem: HTMLElement): void {
    if (!anchorElem) {
      return;
    }

    this._originElement = anchorElem;

    toggleDatasetEntry(
      this._element,
      'optionPanelOriginBorderless',
      this._element.closest('sbb-form-field')?.hasAttribute('borderless')
    );
  }

  private _bindTo(triggerElem: HTMLInputElement): void {
    if (!triggerElem) {
      return;
    }

    // Reset attributes to the old trigger and add them to the new one
    this._removeTriggerAttributes(this._triggerElement);
    this._setTriggerAttributes(triggerElem);

    this._triggerElement = triggerElem;

    this._setupTriggerEvents();
  }

  private _setupTriggerEvents(): void {
    this._triggerEventsController = new AbortController();

    // Open the overlay on focus, click, input and `ArrowDown` event
    this._triggerElement.addEventListener('focus', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this._triggerElement.addEventListener(
      'input',
      (ev) => {
        this.open();
        this._highlightOptions((ev.target as HTMLInputElement).value);
      },
      { signal: this._triggerEventsController.signal }
    );
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
          this.open();
        }
      },
      { signal: this._triggerEventsController.signal }
    );
  }

  // Set overlay position, width and max height
  private _setOverlayPosition(): void {
    setOverlayPosition(this._dialog, this._originElement, this._optionContainer, this._element);
  }

  /** On open/close animation end. */
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open') {
      this._onOpenAnimationEnd();
    } else if (event.animationName === 'close') {
      this._onCloseAnimationEnd();
    }
  }

  private _onOpenAnimationEnd(): void {
    this._state = 'opened';
    this._openPanelEventsController = attachOpenPanelEvents(
      this._setOverlayPosition.bind(this),
      this._onBackdropClick.bind(this),
      this._onKeydownEvent.bind(this)
    );
    this._triggerElement?.setAttribute('aria-expanded', 'true');
    this.didOpen.emit();
  }

  private _onCloseAnimationEnd(): void {
    this._state = 'closed';
    this._openPanelEventsController?.abort();
    this._triggerElement?.setAttribute('aria-expanded', 'false');
    toggleDatasetEntry(this._originElement, 'overlayOpen', false);
    this._resetActiveElement();
    this._optionContainer.scrollTop = 0;
    this.didClose.emit();
  }

  /** If the click is outside the autocomplete, closes the panel. */
  private _onBackdropClick(event: PointerEvent): void {
    if (!isEventOnElement(this._dialog, event) && !isEventOnElement(this._originElement, event)) {
      this.close();
    }
  }

  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state !== 'opened') {
      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.close();
        break;

      case 'Enter':
        this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        this._setNextActiveOption(event);
        break;

      default:
        break;
    }
  }

  private _selectByKeyboard(): void {
    const activeOption = this._options[this._activeItemIndex];

    if (activeOption) {
      activeOption.selected = true;
    }
  }

  private _setNextActiveOption(event: KeyboardEvent): void {
    const filteredOptions: HTMLSbbOptionElement[] = this._options.filter(
      (opt: HTMLSbbOptionElement) =>
        !isValidAttribute(opt, 'disabled') && !isValidAttribute(opt, 'data-group-disabled')
    );

    // Get and activate the next active option
    const next = getNextElementIndex(event, this._activeItemIndex, filteredOptions.length);
    const nextActiveOption = filteredOptions[next];
    nextActiveOption.active = true;
    this._triggerElement.setAttribute('aria-activedescendant', nextActiveOption.id);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    // Reset the previous active option
    const lastActiveOption = filteredOptions[this._activeItemIndex];
    if (lastActiveOption) {
      lastActiveOption.active = false;
    }

    this._activeItemIndex = next;
  }

  private _resetActiveElement(): void {
    const activeElement = this._options[this._activeItemIndex];

    if (activeElement) {
      activeElement.active = false;
    }
    this._activeItemIndex = -1;
    this._triggerElement.removeAttribute('aria-activedescendant');
  }

  /** Highlight the searched text on the options. */
  private _highlightOptions(searchTerm: string): void {
    this._options.forEach((option) => option.highlight(searchTerm));
  }

  private _setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, this._element.id || this._overlayId, false);
  }

  private _removeTriggerAttributes(element: HTMLInputElement): void {
    removeAriaComboBoxAttributes(element);
  }

  public render(): JSX.Element {
    return (
      <Host data-state={this._state}>
        <div class="sbb-autocomplete__gap-fix"></div>
        <div class="sbb-autocomplete__container">
          <div class="sbb-autocomplete__gap-fix">{overlayGapFixCorners()}</div>
          <div
            onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
            class="sbb-autocomplete__panel"
            data-open={this._state === 'opened' || this._state === 'opening'}
            ref={(dialogRef) => (this._dialog = dialogRef)}
          >
            <div class="sbb-autocomplete__wrapper">
              <div
                id={this._overlayId}
                class="sbb-autocomplete__options"
                role="listbox"
                ref={(containerRef) => (this._optionContainer = containerRef)}
              >
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
