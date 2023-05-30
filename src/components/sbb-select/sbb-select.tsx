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
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { isEventOnElement } from '../../global/helpers/position';
import { SbbOptionEventData } from '../sbb-option/sbb-option.custom';
import { getNextElementIndex } from '../../global/helpers/arrow-navigation';
import { setOverlayPosition } from '../../global/helpers/overlay-option-panel';
import { overlayGapFixCorners, SbbOverlayState } from '../../global/helpers/overlay';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import { isSafari } from '../../global/helpers/platform';
import { assignId } from '../../global/helpers/assign-id';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to project options.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-select.scss',
  tag: 'sbb-select',
})
export class SbbSelect implements ComponentInterface {
  /** The value of the select component. If `multiple` is true, it's an array. */
  @Prop({ mutable: true }) public value: string | string[];

  /** The placeholder used if no value has been selected. */
  @Prop() public placeholder: string;

  /** Whether the select allows for multiple selection. */
  @Prop() public multiple = false;

  /** Whether the select is required. */
  @Prop() public required = false;

  /** Whether the select is disabled. */
  @Prop() public disabled = false;

  /** Whether the select is readonly. */
  @Prop() public readonly = false;

  /** Whether the animation is disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  @Element() private _element: HTMLElement;

  /** The state of the select. */
  @State() private _state: SbbOverlayState = 'closed';

  /** The value displayed by the component. */
  @State() private _displayValue: string;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Event({ bubbles: true, cancelable: true }) public change: EventEmitter;

  @Event({ bubbles: true, composed: true }) public input: EventEmitter;

  /** Emits whenever the select starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the select is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the select begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the select is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  private _dialog: HTMLElement;
  private _optionContainer: HTMLElement;
  private _originElement: HTMLElement;
  private _triggerElement: HTMLElement;
  private _openPanelEventsController: AbortController;
  private _overlayId = `sbb-select-${++nextId}`;
  private _activeItemIndex = -1;
  private _searchTimeout: ReturnType<typeof setTimeout>;
  private _searchString = '';
  private _didLoad = false;

  /**
   * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
   * On the other hand, JAWS and NVDA need the role to be an "immediate parent" to the options, or else optgroups won't work.
   */
  private _ariaRoleOnHost = isSafari();

  /** Gets all the HTMLSbbOptionElement projected in the select. */
  private get _options(): HTMLSbbOptionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-option')) as HTMLSbbOptionElement[];
  }

  private get _filteredOptions(): HTMLSbbOptionElement[] {
    return this._options.filter(
      (opt: HTMLSbbOptionElement) =>
        !isValidAttribute(opt, 'disabled') && !isValidAttribute(opt, 'data-group-disabled')
    );
  }

  /** Opens the selection panel. */
  @Method() public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._dialog || this._options.length === 0) {
      return;
    }

    this._state = 'opening';
    this.willOpen.emit();
    this._setOverlayPosition();
  }

  /** Closes the selection panel. */
  @Method() public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    this._state = 'closing';
    this.willClose.emit();
    this._openPanelEventsController.abort();
  }

  /** Listens to option changes. */
  @Listen('option-selection-change')
  public onOptionChanged(event: CustomEvent<SbbOptionEventData>): void {
    if (event.detail.selected) {
      this._onOptionSelected(event.detail);
    } else {
      this._onOptionDeselected(event.detail);
    }
  }

  @Listen('click')
  public onOptionClick(event): void {
    if (event.target?.tagName !== 'SBB-OPTION' || event.target.disabled) {
      return;
    }

    if (!this.multiple) {
      this.close();
    }
  }

  @Watch('value')
  public onValueChanged(newValue: string | string[]): void {
    if (!Array.isArray(newValue)) {
      this._displayValue = newValue;
    } else {
      this._displayValue = newValue.join(', ') || null;
    }
  }

  public componentDidLoad(): void {
    this._setupOrigin();
    this._setupTrigger();

    // Override the default focus behavior
    this._element.focus = () => this._triggerElement.focus();
    this._didLoad = true;
  }

  public connectedCallback(): void {
    if (this._didLoad) {
      this._setupOrigin();
      this._setupTrigger();
    }
    this.onValueChanged(this.value);
  }

  public disconnectedCallback(): void {
    this._element.prepend(this._triggerElement); // Take back the trigger element previously moved to the light DOM
    this._openPanelEventsController?.abort();
  }

  /** Sets the originElement; if the component is used in a sbb-form-field uses it, otherwise uses the parentElement. */
  private _setupOrigin(): void {
    this._originElement =
      this._element.closest('sbb-form-field')?.shadowRoot.querySelector('#overlay-anchor') ||
      this._element.parentElement;
    if (this._originElement) {
      toggleDatasetEntry(
        this._element,
        'optionPanelOriginBorderless',
        this._element.closest('sbb-form-field')?.hasAttribute('borderless')
      );
    }
  }

  /**
   * To assess screen-readers problems caused by the interaction between aria patterns and shadow DOM,
   * we are forced to move the 'combobox' trigger element to the light DOM
   */
  private _setupTrigger(): void {
    // Move the trigger before the sbb-select
    this._element.parentElement.insertBefore(this._triggerElement, this._element);

    // Set the invisible trigger element dimension to match the parent (needed for screen readers)
    const containerElement = this._element.closest('sbb-form-field') ?? this._element;
    this._triggerElement.style.top = '0px';
    this._triggerElement.style.height = `${containerElement.offsetHeight}px`;
    this._triggerElement.style.width = `${containerElement.offsetWidth}px`;
  }

  private _setOverlayPosition(): void {
    setOverlayPosition(this._dialog, this._originElement, this._optionContainer, this._element);
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open') {
      this._onOpenAnimationEnd();
    } else if (event.animationName === 'close') {
      this._onCloseAnimationEnd();
    }
  }

  private _onOpenAnimationEnd(): void {
    this._state = 'opened';
    this._attachOpenPanelEvents();
    this._triggerElement.setAttribute('aria-expanded', 'true');

    this.didOpen.emit();
  }

  private _onCloseAnimationEnd(): void {
    this._state = 'closed';
    this._triggerElement.setAttribute('aria-expanded', 'false');
    this._resetActiveElement();
    this._optionContainer.scrollTop = 0;
    this.didClose.emit();
  }

  /** When an option is selected, updates the displayValue; it also closes the select if not `multiple`. */
  private _onOptionSelected(optionSelectionChange: SbbOptionEventData): void {
    if (!this.multiple) {
      this._filteredOptions
        .filter((option) => option.id !== optionSelectionChange.id)
        .forEach((option) => (option.selected = false));
      this.value = optionSelectionChange.value;
    } else {
      if (!this.value) {
        this.value = [optionSelectionChange.value];
      } else if (!this.value.includes(optionSelectionChange.value)) {
        this.value = [...this.value, optionSelectionChange.value];
      }
    }

    this.input.emit();
    this.change.emit();
  }

  /** When an option is unselected in `multiple`, removes it from value and updates displayValue. */
  private _onOptionDeselected(optionSelectionChange: SbbOptionEventData): void {
    if (this.multiple) {
      this.value = (this.value as string[]).filter(
        (el: string) => el !== optionSelectionChange.value
      );

      this.input.emit();
      this.change.emit();
    }
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Recalculate the overlay position on scroll and window resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('resize', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });

    window.addEventListener('click', (event) => this._onBackdropClick(event), {
      signal: this._openPanelEventsController.signal,
    });
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this._state === 'opened') {
      this._openPanelKeyboardInteraction(event);
    }
    if (this._state === 'closed') {
      this._closePanelKeyboardInteraction(event);
    }
  }

  private _closePanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this._checkForLetterSelection(event)) {
      return this._setNextActiveOptionByText(event);
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        break;
    }
  }

  private _openPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this.disabled || this.readonly || this._state !== 'opened') {
      return;
    }

    if (this._checkForLetterSelection(event)) {
      return this._setNextActiveOptionByText(event);
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.close();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this._setNextActiveOption(event);
        break;

      case 'Home':
      case 'PageUp':
        event.preventDefault();
        this._setNextActiveOption(event, 0);
        break;

      case 'End':
      case 'PageDown':
        event.preventDefault();
        this._setNextActiveOption(event, this._filteredOptions.length - 1);
        break;
    }
  }

  private _checkForLetterSelection(event): boolean {
    return (
      event.key === 'Backspace' ||
      event.key === 'Clear' ||
      (event.key.length === 1 &&
        event.key !== ' ' &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey)
    );
  }

  private _setNextActiveOptionByText(event): void {
    // Set timeout and the string to search.
    if (typeof this._searchTimeout === typeof setTimeout) {
      clearTimeout(this._searchTimeout);
    }
    this._searchTimeout = setTimeout(() => (this._searchString = ''), 1000);
    this._searchString += event.key;

    // Reorder the _filteredOption array to have the last selected element at the bottom.
    const indexForSlice: number = this._activeItemIndex + 1;
    const filteredOptionsSorted: HTMLSbbOptionElement[] = [
      ...this._filteredOptions.slice(indexForSlice),
      ...this._filteredOptions.slice(0, indexForSlice),
    ];

    const match: HTMLSbbOptionElement = filteredOptionsSorted.find(
      (option: HTMLSbbOptionElement) =>
        option.textContent.toLowerCase().indexOf(this._searchString.toLowerCase()) === 0
    );
    if (match) {
      // If an exact match has been found, go to that option.
      this._setNextActiveOption(event, this._filteredOptions.indexOf(match));
    } else if (
      this._searchString.length > 1 &&
      new RegExp(`^${this._searchString.charAt(0)}*$`).test(this._searchString)
    ) {
      // If no exact match has been found but the string to search is made by the same repeated letter,
      // go to the first element, if exists, that matches the letter.
      const firstMatch: HTMLSbbOptionElement = filteredOptionsSorted.find(
        (option: HTMLSbbOptionElement) =>
          option.textContent.toLowerCase().indexOf(this._searchString[0].toLowerCase()) === 0
      );
      if (firstMatch) {
        this._setNextActiveOption(event, this._filteredOptions.indexOf(firstMatch));
      }
    } else {
      // No match found, clear the timeout and the search term.
      clearTimeout(this._searchTimeout);
      this._searchString = '';
    }
  }

  private _selectByKeyboard(): void {
    const activeOption: HTMLSbbOptionElement = this._filteredOptions[this._activeItemIndex];

    if (this.multiple) {
      activeOption.selected = !activeOption.selected;
    } else {
      this.close();
    }
  }

  private _setNextActiveOption(event: KeyboardEvent, index?: number): void {
    const nextIndex =
      index ?? getNextElementIndex(event, this._activeItemIndex, this._filteredOptions.length);
    this._setActiveElement(
      this._filteredOptions[nextIndex],
      this._filteredOptions[this._activeItemIndex]
    );
    if (!this.multiple) {
      this._setSelectedElement(
        this._filteredOptions[nextIndex],
        this._filteredOptions[this._activeItemIndex]
      );
    } else if (event?.shiftKey) {
      this._filteredOptions[nextIndex].selected = !this._filteredOptions[nextIndex].selected;
    }
    this._activeItemIndex = nextIndex;
  }

  private _setActiveElement(
    nextActiveOption: HTMLSbbOptionElement,
    lastActiveOption: HTMLSbbOptionElement = null,
    setActiveDescendant = true
  ): void {
    nextActiveOption.active = true;
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    if (setActiveDescendant) {
      this._triggerElement.setAttribute('aria-activedescendant', nextActiveOption.id);
    }

    // Reset the previous
    if (lastActiveOption && lastActiveOption !== nextActiveOption) {
      lastActiveOption.active = false;
    }
  }

  private _setSelectedElement(
    nextActiveOption: HTMLSbbOptionElement,
    lastActiveOption: HTMLSbbOptionElement
  ): void {
    nextActiveOption.selected = true;
    if (lastActiveOption && lastActiveOption !== nextActiveOption) {
      lastActiveOption.selected = false;
    }
  }

  private _resetActiveElement(): void {
    const activeElement = this._filteredOptions[this._activeItemIndex];

    if (activeElement) {
      activeElement.active = false;
    }
    this._activeItemIndex = -1;
    this._triggerElement.removeAttribute('aria-activedescendant');
  }

  private _onBackdropClick(event: MouseEvent): void {
    if (!isEventOnElement(this._dialog, event) && !isEventOnElement(this._originElement, event)) {
      this.close();
    }
  }

  private _setValueFromSelectedOption(): void {
    if (!this.multiple) {
      const selectedOption = this._filteredOptions.find((option) => option.selected);
      if (selectedOption) {
        this._activeItemIndex = this._filteredOptions.findIndex(
          (option) => option === selectedOption
        );
        this.value = selectedOption.value;
      }
    } else {
      const options = this._filteredOptions.filter((option) => option.selected);
      if (options && options.length > 0) {
        const value = [];
        for (const option of options) {
          value.push(option.value);
        }
        this.value = value;
      }
    }
  }

  private _toggleOpening(): void {
    if (this.disabled || this.readonly) {
      return;
    }
    this._triggerElement?.focus();

    switch (this._state) {
      case 'opened': {
        this.close();
        break;
      }
      case 'closed': {
        this.open();
        break;
      }
      default:
        break;
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        data-state={this._state}
        data-multiple={this.multiple}
        role={this._ariaRoleOnHost ? 'listbox' : null}
        ref={this._ariaRoleOnHost && assignId(() => this._overlayId)}
        onClick={() => this._toggleOpening()}
        dir={getDocumentWritingMode()}
      >
        {/* This element is visually hidden and will be appended to the light DOM to allow screen readers to work properly */}
        <div
          class="sbb-screen-reader-only"
          tabindex="0"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-required={this.required.toString()}
          aria-controls={this._overlayId}
          aria-owns={this._overlayId}
          ref={(ref) => (this._triggerElement = ref)}
          onKeyDown={(event) => this._onKeyDown(event)}
          onClick={() => this._toggleOpening()}
        >
          {this._displayValue ?? <span>{this.placeholder}</span>}
        </div>

        {/* Visually display the value */}
        <div class="sbb-select__trigger" aria-hidden="true">
          {this._displayValue ?? (
            <span class="sbb-select__trigger--placeholder">{this.placeholder}</span>
          )}
        </div>

        <div class="sbb-select__gap-fix"></div>
        <div class="sbb-select__container">
          <div class="sbb-select__gap-fix">{overlayGapFixCorners()}</div>
          <div
            onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
            class="sbb-select__panel"
            data-open={this._state === 'opened' || this._state === 'opening'}
            ref={(dialogRef) => (this._dialog = dialogRef)}
          >
            <div class="sbb-select__wrapper">
              <div
                id={!this._ariaRoleOnHost ? this._overlayId : null}
                class="sbb-select__options"
                role={!this._ariaRoleOnHost ? 'listbox' : null}
                aria-multiselectable={this.multiple}
                ref={(containerRef) => (this._optionContainer = containerRef)}
              >
                <slot onSlotchange={(): void => this._setValueFromSelectedOption()}></slot>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
