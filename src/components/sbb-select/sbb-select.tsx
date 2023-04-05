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
import {
  attachOpenPanelEvents,
  setOverlayPosition,
} from '../../global/helpers/overlay-option-panel';
import {overlayGapFixCorners, SbbOverlayState} from '../../global/helpers/overlay';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';

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

  /** Opens the selection panel. */
  @Method() public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._dialog || this._options.length === 0) {
      return;
    }

    this._setSelectedOptionFromValue();
    this._state = 'opening';
    this.willOpen.emit();
    this._setOverlayPosition();
    toggleDatasetEntry(this._originElement, 'overlayOpen', true);
  }

  /** Closes the selection panel. */
  @Method() public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    toggleDatasetEntry(this._originElement, 'overlayOpen', false);
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

  @Watch('value')
  public onValueChanged(newValue: string | string[]): void {
    if (!Array.isArray(newValue)) {
      this._displayValue = newValue;
    } else {
      this._displayValue = newValue.join(', ') || null;
    }
  }

  private _dialog: HTMLElement;
  private _optionContainer: HTMLElement;
  private _originElement: HTMLElement;
  private _openPanelEventsController: AbortController;
  private _overlayId = `sbb-select-${++nextId}`;
  private _activeItemIndex = -1;

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

  public connectedCallback(): void {
    this._setupOrigin();
    this.onValueChanged(this.value);
  }

  public disconnectedCallback(): void {
    this._openPanelEventsController?.abort();
  }

  /** Sets the originElement; if the component is used in a sbb-form-field uses it, otherwise uses the parentElement. */
  private _setupOrigin(): void {
    this._originElement =
      (this._element.closest('sbb-form-field') as HTMLSbbFormFieldElement) ||
      this._element.parentElement;
    if (this._originElement) {
      toggleDatasetEntry(this._originElement, 'overlayOpen', false);
    }
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
    this._openPanelEventsController = attachOpenPanelEvents(
      this._setOverlayPosition.bind(this),
      this._onBackdropClick.bind(this),
      this._onKeydownEvent.bind(this)
    );
    this._element.setAttribute('aria-expanded', 'true');
    this.didOpen.emit();
  }

  private _onCloseAnimationEnd(): void {
    this._state = 'closed';
    this._openPanelEventsController?.abort();
    this._element.setAttribute('aria-expanded', 'false');
    toggleDatasetEntry(this._originElement, 'overlayOpen', false);
    this._resetActiveElement();
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

  private _onHostKeydown(event): void {
    event.preventDefault();
    if (this._state !== 'closed') {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        this.open();
        break;

      default:
        break;
    }
  }

  private _onKeydownEvent(event): void {
    event.preventDefault();

    if (this._state !== 'opened') {
      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.close();
        break;

      case 'Enter':
      case ' ':
        this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        this._setNextActiveOption(event);
        break;

      case 'Home':
      case 'PageUp':
        this._setNextActiveOption(event, 0);
        break;

      case 'End':
      case 'PageDown':
        this._setNextActiveOption(event, this._filteredOptions.length - 1);
        break;

      default:
        break;
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
    if (event && event.shiftKey) {
      this._filteredOptions[nextIndex].selected = !this._filteredOptions[nextIndex].selected;
    }
    this._activeItemIndex = nextIndex;
  }

  private _setActiveElement(
    nextActiveOption: HTMLSbbOptionElement,
    lastActiveOption: HTMLSbbOptionElement
  ): void {
    nextActiveOption.active = true;
    if (!this.multiple) {
      nextActiveOption.selected = true;
    }
    this._element.setAttribute('aria-activedescendant', nextActiveOption.id);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    // Reset the previous
    if (lastActiveOption && lastActiveOption !== nextActiveOption) {
      lastActiveOption.active = false;
      if (!this.multiple) {
        lastActiveOption.selected = false;
      }
    }
  }

  private _resetActiveElement(): void {
    const activeElement = this._filteredOptions[this._activeItemIndex];

    if (activeElement) {
      activeElement.active = false;
    }
    this._element.removeAttribute('aria-activedescendant');
    this._activeItemIndex = -1;
  }

  private _onBackdropClick(event: PointerEvent): void {
    if (!isEventOnElement(this._dialog, event) && !isEventOnElement(this._originElement, event)) {
      this.close();
    }
  }

  private _setSelectedOptionFromValue(): void {
    if (!Array.isArray(this.value)) {
      const option = this._filteredOptions.find((option) => option.value === this.value);
      if (option) {
        option.selected = true;
        option.active = true;
        this._activeItemIndex = this._filteredOptions.indexOf(option);
      }
    } else if (this.value.length > 0) {
      for (const el of this.value) {
        const option = this._filteredOptions.find((option) => option.value === el);
        if (option) {
          option.selected = true;
        }
      }
    }
  }

  private _toggleOpening(): void {
    if (this.disabled || this.readonly) {
      return;
    }

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
        role="combobox"
        aria-autocomplete="none"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-required={this.required.toString()}
        aria-controls={this._overlayId}
        aria-owns={this._overlayId}
        data-state={this._state}
        onKeydown={(event) => this._onHostKeydown(event)}
        tabindex="0"
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div class="sbb-select__trigger" onClick={() => this._toggleOpening()}>
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
            <div
              role="listbox"
              aria-multiselectable={this.multiple}
              class="sbb-select__options"
              id={this._overlayId}
              ref={(containerRef) => (this._optionContainer = containerRef)}
            >
              <slot onSlotchange={(): void => this._setSelectedOptionFromValue()}></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
