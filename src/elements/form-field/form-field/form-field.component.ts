import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.ts';
import type { SbbChipGroupElement } from '../../chip.ts';
import { sbbInputModalityDetector } from '../../core/a11y.ts';
import { SbbLanguageController } from '../../core/controllers.ts';
import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import { i18nOptional } from '../../core/i18n.ts';
import {
  appendAriaElements,
  removeAriaElements,
  SbbElementInternalsMixin,
  type SbbFormAssociatedInputMixinType,
  SbbHydrationMixin,
  SbbNegativeMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbSelectElement } from '../../select.ts';

import style from './form-field.scss?lit&inline';

import '../../icon.ts';

let nextId = 0;

const patchedInputs = new WeakMap<HTMLInputElement, PropertyDescriptor>();
const nativeInputElements = ['input', 'textarea', 'select'];

/** An interface which allows a control to work inside a `SbbFormField`. */
export interface SbbFormFieldElementControl {
  /** The id of the form field control. */
  readonly id: string;
  /** Whether the control is empty. */
  readonly empty: boolean;
  /** Whether the control is readonly. */
  readonly readOnly?: boolean;
  /** Whether the control is disabled. */
  readonly disabled: boolean;

  /**
   * Handles a click on the control's container.
   * If not implemented, focus() of the element is called.
   */
  onContainerClick?(event: MouseEvent): void;
}

export class SbbFormFieldControlEvent extends Event {
  private _control: SbbFormFieldElementControl | null;

  public get control(): SbbFormFieldElementControl | null {
    return this._control;
  }

  public constructor(control: SbbFormFieldElementControl | null) {
    super('formfieldcontrol');
    this._control = control;
  }
}

/**
 * It wraps an input element adding label, errors, icon, etc.
 *
 * @slot - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 *
 * @cssprop [--sbb-form-field-outline-offset] - To override the focus outline offset,
 * @cssprop [--sbb-form-field-focus-underline-z-index] - To override the z-index of the focus underline effect,
 */
export
@customElement('sbb-form-field')
class SbbFormFieldElement extends SbbNegativeMixin(
  SbbElementInternalsMixin(SbbHydrationMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  // List of elements that should not focus input on click
  private readonly _excludedFocusElements = ['button', 'sbb-popover', 'sbb-option', 'sbb-chip'];

  private readonly _floatingLabelSupportedInputElements = [
    'input',
    'select',
    'textarea',
    'sbb-select',
  ];

  private readonly _floatingLabelSupportedInputTypes = [
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url',
  ];

  /**
   * Whether to reserve space for an error message.
   * `none` does not reserve any space.
   * `reserve` does reserve one row for an error message.
   */
  @property({ attribute: 'error-space', reflect: true })
  public accessor errorSpace: 'none' | 'reserve' = 'none';

  /** Indicates whether the input is optional. */
  @forceType()
  @property({ type: Boolean })
  public accessor optional: boolean = false;

  /**
   * Size variant, either l, m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'l' | 'm' | 's' = isLean() ? 's' : 'm';

  /** Whether to display the form field without a border. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor borderless: boolean = false;

  /** Defines the width of the component:
   * - `default`: the component has defined width and min-width;
   * - `collapse`: the component adapts itself to its inner input content. */
  @property({ reflect: true }) public accessor width: 'default' | 'collapse' = 'default';

  /** Whether to visually hide the label. If hidden, screen readers will still read it. */
  @forceType()
  @property({ attribute: 'hidden-label', reflect: true, type: Boolean })
  public accessor hiddenLabel: boolean = false;

  /** Whether the label should float. If activated, the placeholder of the input is hidden. */
  @forceType()
  @property({ attribute: 'floating-label', reflect: true, type: Boolean })
  public accessor floatingLabel: boolean = false;

  /** It is used internally to get the `error` slot. */
  @state() private accessor _errorElements: Element[] = [];

  /** Reference to the slotted input element. */
  @state() private accessor _input: HTMLInputElement | HTMLSelectElement | HTMLElement | null =
    null;

  /** Reference to the slotted label elements. */
  @state() private accessor _label!: HTMLLabelElement;

  /** Returns the input element. */
  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | null {
    return this._input;
  }

  /** Reference to the slotted label. */
  public get label(): HTMLLabelElement | null {
    return this._label;
  }

  private _language = new SbbLanguageController(this);

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = !isServer
    ? new MutationObserver((mutations: MutationRecord[]) => {
        if (mutations.some((m) => m.type === 'attributes') && this._input) {
          this._readInputState();
          this._registerInputFormListener();
          this._checkAndUpdateInputEmpty();
        }
      })
    : null;

  private _inputFormAbortController = new AbortController();
  private _control: SbbFormFieldElementControl | null = null;

  public constructor() {
    super();
    this.addEventListener?.(
      'focusin',
      (event) => {
        if (
          event.target === this.inputElement ||
          event.target === (this.inputElement as SbbSelectElement | undefined)?.inputElement
        ) {
          this.internals.states.add('focus');
          this.internals.states.add(`focus-origin-${sbbInputModalityDetector.mostRecentModality}`);
        }
      },
      { passive: true },
    );
    this.addEventListener?.(
      'focusout',
      (event) => {
        if (
          event.target === this.inputElement ||
          event.target === (this.inputElement as SbbSelectElement | undefined)?.inputElement
        ) {
          this._checkAndUpdateInputEmpty();
          this.internals.states.delete('focus');
          for (const state of this.internals.states) {
            if (state.startsWith('focus-origin-')) {
              this.internals.states.delete(state);
            }
          }
        }
      },
      { passive: true },
    );
    this.addEventListener('input', () => this._checkAndUpdateInputEmpty());
    this.addEventListener('displayvaluechange', () => this._checkAndUpdateInputEmpty());
    // We want to prevent the native browser validation message popover
    // to be shown. This also prevents a bug in WebKit, which would not
    // allow host as the validity anchor: https://bugs.webkit.org/show_bug.cgi?id=269832
    // This is duplicated from the form associated mixin for the native
    // input controls (e.g. <input> or <select>).
    this.addEventListener('invalid', (e) => e.preventDefault(), { capture: true });
    this.addEventListener('formfieldcontrol', (e: SbbFormFieldControlEvent) => {
      this._control = e.control;
      if (this._connectInputElement() === 'unchanged') {
        this._assignErrorMessageElements();
        this._readInputState();
        this._checkAndUpdateInputEmpty();
      }
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._assignSlots();
    this._connectInputElement();
    this._syncNegative();
    this._syncSize();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncNegative();
    }
    if (changedProperties.has('size')) {
      this._syncSize();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._formFieldAttributeObserver?.disconnect();
    this._inputFormAbortController.abort();
    if (this._input?.localName === 'input') {
      this._unpatchInputValue();
    }
  }

  private _handleWrapperClick(event: MouseEvent): void {
    if (this._isElementFocusExcluded(event)) {
      return;
    }

    if (this._control?.onContainerClick) {
      this._control?.onContainerClick(event);
    } else if ((event.target as Element).localName !== 'label') {
      if (
        this._input?.localName === 'sbb-select' &&
        (event.target as HTMLElement).localName !== 'sbb-select'
      ) {
        this._input.click();
      }
      this._input?.focus();
    }
  }

  private _isElementFocusExcluded(event: Event): boolean {
    return event
      .composedPath()
      .some(
        (el) =>
          (el instanceof window.HTMLElement &&
            (el.getAttribute('tabindex') === '0' || el.hasAttribute('contenteditable'))) ||
          this._excludedFocusElements.includes((el as HTMLElement).localName),
      );
  }

  private _onSlotLabelChange(): void {
    const labels = Array.from(this.querySelectorAll('label'));
    if (import.meta.env.DEV && labels.length > 1) {
      console.warn(
        `Detected more than one label in sbb-form-field#${this.id}. Only one label is supported.`,
      );
    }
    this._label = labels[0];
    this._syncLabelInputReferences();
  }

  /**
   * It is used internally to assign the attributes of `<input>` to `_id` and `_input` and to observe the native readonly and disabled attributes.
   */
  private _onSlotInputChange(): void {
    this._assignSlots();
    this._connectInputElement();
  }

  private _assignSlots(): void {
    this.querySelectorAll('label:not([slot])').forEach((e) => e.setAttribute('slot', 'label'));
    this.querySelectorAll('sbb-error:not([slot])').forEach((e) => e.setAttribute('slot', 'error'));
  }

  private _connectInputElement(): 'changed' | 'no-input' | 'unchanged' {
    let newInput: HTMLElement | null;
    if (this._control?.id) {
      newInput = (this.getRootNode() as Document | ShadowRoot).getElementById(this._control.id);
    } else {
      // Find the slotted input element, even if it's nested (e.g. chip group)
      const inputCandidates = Array.from(
        this.querySelectorAll<HTMLElement>('*:not([slot],sbb-chip-group)'),
      );
      newInput =
        (inputCandidates.find((e) => this._isInputElement(e)) || inputCandidates[0]) ?? null;
    }

    if (newInput === this._input) {
      return 'unchanged';
    } else if (this._input) {
      this.internals.states.delete(`input-type-${this._input.localName}`);
      if (this._input.localName === 'input') {
        this._unpatchInputValue();
      }
    }

    if (!newInput) {
      this._input = null;
      return 'no-input';
    }

    this._input = newInput;
    this._registerInputFormListener();
    this._assignErrorMessageElements();
    this._readInputState();
    this._checkAndUpdateInputEmpty();

    if (this._input.localName === 'textarea') {
      this._input.setAttribute('rows', this._input.getAttribute('rows') || '3');
    } else if (this._input.localName === 'input') {
      this._patchInputValue();
    } else if (
      (this._input.localName === 'select' || this._input.localName === 'sbb-select') &&
      !this.hasUpdated
    ) {
      // Due to SSR the dropdown icon for selects cannot be rendered in the first render pass.
      // Due to this we schedule a re-render to render the icon.
      this.hydrationComplete.then(() => this.requestUpdate());
    }

    this._formFieldAttributeObserver?.disconnect();
    this._formFieldAttributeObserver?.observe(this._input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled', 'form', 'class', 'data-expanded'],
    });
    this.internals.states.add(`input-type-${this._input.localName}`);
    this._syncLabelInputReferences();
    return 'changed';
  }

  private _syncLabelInputReferences(): void {
    if (!this._input || !this._label) {
      return;
    }

    if (
      nativeInputElements.includes(this._input.localName) ||
      (customElements.get(this._input.localName) as { formAssociated: boolean } | undefined)
        ?.formAssociated
    ) {
      // For native input elements we use the `for` attribute on the label to reference the input
      // via id reference.
      this._input.id ||= `sbb-form-field-input-${nextId++}`;
      this._label.htmlFor = this._input.id;
    } else {
      // For non-native input elements, that do not support references via the label for attribute,
      // we use aria-labelledby on the input element to reference the label element via id.
      // TODO: Migrate to ariaLabelledByElements when available:
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaLabelledByElements
      this._label.id ||= `sbb-form-field-label-${nextId++}`;
      const labelledby =
        this._input
          .getAttribute('aria-labelledby')
          ?.split(' ')
          .filter((l) => !!l && l !== this._label!.id) ?? [];
      this._input.setAttribute('aria-labelledby', [...labelledby, this._label.id].join(' '));
    }
  }

  private _isInputElement(input: Element): boolean {
    return (
      nativeInputElements.includes(input.localName) ||
      !!(customElements.get(input.localName) as { formAssociated: boolean } | undefined)
        ?.formAssociated
    );
  }

  private _readInputState(): void {
    this.toggleState('readonly', this._control?.readOnly ?? this._input!.hasAttribute('readonly'));
    this.toggleState('disabled', this._control?.disabled ?? this._input!.hasAttribute('disabled'));
    this.toggleState('has-popup-open', this._input!.hasAttribute('data-expanded'));
  }

  private _registerInputFormListener(): void {
    this._inputFormAbortController.abort();
    const { signal } = (this._inputFormAbortController = new AbortController());

    const form =
      (this._input as HTMLInputElement | HTMLSelectElement | undefined)?.form ??
      this._input?.closest('form');
    // Timeout needed to have value updated
    const resetHandler = (): unknown => setTimeout(() => this.reset());
    form?.addEventListener('reset', resetHandler, { signal });
  }

  // We need to patch the value property of the HTMLInputElement in order
  // to be able to reset the floating label in the empty state.
  private _patchInputValue(): void {
    const inputElement = this._input as HTMLInputElement;
    if (!inputElement || patchedInputs.has(inputElement)) {
      return;
    }

    const originalDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(inputElement),
      'value',
    );

    if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.get) {
      return;
    }

    patchedInputs.set(inputElement, originalDescriptor);

    const { get: getter, set: setter } = originalDescriptor;
    const checkAndUpdateInputEmpty = (): void => this._checkAndUpdateInputEmpty();

    Object.defineProperty(inputElement, 'value', {
      ...originalDescriptor,
      get() {
        return getter.call(this);
      },
      set(newValue) {
        setter.call(this, newValue);
        checkAndUpdateInputEmpty();
      },
    });
  }

  private _unpatchInputValue(): void {
    const inputElement = this._input as HTMLInputElement;
    const originalDescriptor = patchedInputs.get(inputElement);
    if (originalDescriptor) {
      Object.defineProperty(inputElement, 'value', originalDescriptor);
      patchedInputs.delete(inputElement);
    }
  }

  private _checkAndUpdateInputEmpty(): void {
    this.toggleState(
      'empty',
      this._control?.empty ??
        (((this._floatingLabelSupportedInputElements.includes(this._input?.localName as string) ||
          (this._input?.constructor as undefined | typeof SbbFormAssociatedInputMixinType)
            ?.formFieldAssociated) ??
          false) &&
          this._isInputEmpty()),
    );
  }

  private _isInputEmpty(): boolean {
    const chipGroupElem: SbbChipGroupElement | null = this.querySelector('sbb-chip-group');
    if (chipGroupElem) {
      return (
        this._isInputValueEmpty() &&
        (Array.isArray(chipGroupElem.value)
          ? chipGroupElem.value.length === 0
          : !chipGroupElem.querySelector('sbb-chip'))
      );
    } else if (this._input instanceof HTMLInputElement) {
      return (
        this._floatingLabelSupportedInputTypes.includes(this._input.type) &&
        this._isInputValueEmpty()
      );
    } else if (this._input instanceof HTMLSelectElement) {
      return this._input.selectedOptions?.item(0)?.label?.trim() === '';
    } else if (this._input?.localName === 'sbb-select') {
      return (this._input as SbbSelectElement).getDisplayValue?.()?.trim() === '';
    } else {
      return this._isInputValueEmpty();
    }
  }

  private _isInputValueEmpty(): boolean {
    const value = (this._input as { value: string }).value;
    return ['', undefined, null].includes(value) || (Array.isArray(value) && value.length === 0);
  }

  /**
   * It is used internally to set the aria-describedby attribute for the slotted input referencing available <sbb-error> instances.
   */
  private _onSlotErrorChange(event: Event): void {
    const errorElements = (event.target as HTMLSlotElement).assignedElements();
    if (this._input && this._input.ariaDescribedByElements?.length) {
      this._input.ariaDescribedByElements = removeAriaElements(
        this._input.ariaDescribedByElements,
        ...(this._errorElements ?? []),
      );
    }

    this._errorElements = errorElements;
    for (const el of this._errorElements) {
      // Instead of defining a container with an aria-live region as expected, we had to change
      // setting it for every slotted element to properly work in all browsers and screen reader combinations.
      el.role ||= 'status';
    }

    this._assignErrorMessageElements();
    this.toggleState('has-error', !!this._errorElements.length);
    this._syncNegative();
  }

  private _assignErrorMessageElements(): void {
    if (this._input) {
      this._input.ariaDescribedByElements = appendAriaElements(
        this._input.ariaDescribedByElements,
        ...this._errorElements,
      );
    }
  }

  /** Manually reset the form field. Currently, this only resets the floating label. */
  public reset(): void {
    this._checkAndUpdateInputEmpty();
  }

  /** Manually clears the input value. It only works for inputs, selects are not supported. */
  public clear(): void {
    if ((this._input?.localName as string) !== 'input') {
      return;
    }
    (this._input as { value: string }).value = '';
    this._checkAndUpdateInputEmpty();
  }

  private _syncNegative(): void {
    this.querySelectorAll?.(
      'sbb-error,sbb-mini-button,sbb-mini-button-link,sbb-form-field-clear,sbb-datepicker-next-day,sbb-datepicker-previous-day,sbb-datepicker-toggle,sbb-select,sbb-autocomplete,sbb-autocomplete-grid,sbb-chip-group',
    ).forEach((element) => element.toggleAttribute('negative', this.negative));
  }

  private _syncSize(): void {
    this.querySelectorAll?.<SbbAutocompleteBaseElement | SbbSelectElement>(
      'sbb-autocomplete,sbb-autocomplete-grid,sbb-select',
    ).forEach((element) => (element.size = this.size === 's' ? 's' : 'm'));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-form-field__space-wrapper">
        ${/* Queried by id from the autocomplete/select to be used as the anchor element */ ''}
        <div @click=${this._handleWrapperClick} class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix" @slotchange=${this._syncNegative}></slot>
          <div class="sbb-form-field__input-container">
            <span class="sbb-form-field__label-spacer" aria-hidden="true"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label" @slotchange=${this._onSlotLabelChange}></slot>
                ${this.optional
                  ? html` <span aria-hidden="true"> ${i18nOptional[this._language.current]} </span>`
                  : nothing}
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot @slotchange=${this._onSlotInputChange}></slot>
            </div>
            ${this.hasUpdated && ['select', 'sbb-select'].includes(this._input?.localName as string)
              ? html`<sbb-icon
                  name="chevron-small-down-small"
                  class="sbb-form-field__select-input-icon"
                ></sbb-icon>`
              : nothing}
          </div>
          <slot name="suffix" @slotchange=${this._syncNegative}></slot>
        </div>

        <div class="sbb-form-field__error">
          <slot name="error" @slotchange=${this._onSlotErrorChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field': SbbFormFieldElement;
  }

  interface HTMLElementEventMap {
    formfieldcontrol: SbbFormFieldControlEvent;
  }
}
