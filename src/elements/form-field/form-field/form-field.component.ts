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

import { sbbInputModalityDetector } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { i18nOptional } from '../../core/i18n.js';
import {
  SbbElementInternalsMixin,
  SbbHydrationMixin,
  SbbNegativeMixin,
} from '../../core/mixins.js';
import type { SbbSelectElement } from '../../select.js';

import style from './form-field.scss?lit&inline';

import '../../icon.js';

let nextId = 0;
let nextFormFieldErrorId = 0;

const patchedInputs = new WeakMap<HTMLInputElement, PropertyDescriptor>();
const nativeInputElements = ['input', 'textarea', 'select'];

/**
 * It wraps an input element adding label, errors, icon, etc.
 *
 * @slot - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 */
export
@customElement('sbb-form-field')
@slotState()
class SbbFormFieldElement extends SbbNegativeMixin(
  SbbElementInternalsMixin(SbbHydrationMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = style;

  // List of elements that should not focus input on click
  private readonly _excludedFocusElements = ['button', 'sbb-popover', 'sbb-option', 'sbb-chip'];

  private readonly _floatingLabelSupportedInputElements = [
    'input',
    'select',
    'sbb-date-input',
    'sbb-time-input',
    'sbb-select',
    'textarea',
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
  @state() private accessor _input!: HTMLInputElement | HTMLSelectElement | HTMLElement | undefined;

  /** Reference to the slotted label elements. */
  @state() private accessor _label!: HTMLLabelElement;

  /** Returns the input element. */
  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | undefined {
    return this._input;
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

  public constructor() {
    super();
    this.addEventListener?.(
      'focusin',
      (event) => {
        if (
          event.target === this.inputElement ||
          event.target === (this.inputElement as SbbSelectElement).inputElement
        ) {
          this.internals.states.add('input-focused');
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
          event.target === (this.inputElement as SbbSelectElement).inputElement
        ) {
          this._checkAndUpdateInputEmpty();
          this.internals.states.delete('input-focused');
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
    this.addEventListener('displayValueChange', () => this._checkAndUpdateInputEmpty());
    // We want to prevent the native browser validation message popover
    // to be shown. This also prevents a bug in WebKit, which would not
    // allow host as the validity anchor: https://bugs.webkit.org/show_bug.cgi?id=269832
    // This is duplicated from the form associated mixin for the native
    // input controls (e.g. <input> or <select>).
    this.addEventListener('invalid', (e) => e.preventDefault(), { capture: true });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._assignSlots();
    this._connectInputElement();
    this._syncNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncNegative();
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

  private _handleWrapperClick(event: Event): void {
    if (this._isElementFocusExcluded(event)) {
      return;
    }

    if ((event.target as Element).localName !== 'label') {
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
    this.querySelectorAll('sbb-form-error:not([slot])').forEach((e) =>
      e.setAttribute('slot', 'error'),
    );
  }

  private _connectInputElement(): void {
    // Find the slotted input element, even if it's nested (e.g. chip group)
    const inputCandidates = Array.from(
      this.querySelectorAll<HTMLElement>('*:not([slot],sbb-chip-group)'),
    );
    const newInput = inputCandidates.find((e) => this._isInputElement(e)) || inputCandidates[0];

    if (newInput === this._input) {
      return;
    } else if (this._input) {
      this.internals.states.delete(`input-type-${this._input.localName}`);
      if (this._input.localName === 'input') {
        this._unpatchInputValue();
      }
    }

    if (!newInput) {
      this._input = undefined;
      return;
    }

    this._input = newInput;
    this._applyAriaDescribedby();
    this._readInputState();
    this._registerInputFormListener();
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
    this._toggleState('readonly', this._input!.hasAttribute('readonly'));
    this._toggleState('disabled', this._input!.hasAttribute('disabled'));
    this._toggleState('has-popup-open', this._input!.hasAttribute('data-expanded'));
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
    this._toggleState(
      'input-empty',
      this._floatingLabelSupportedInputElements.includes(this._input?.localName as string) &&
        this._isInputEmpty(),
    );
  }

  private _isInputEmpty(): boolean {
    const chipGroupElem = this.querySelector('sbb-chip-group');
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

  private _toggleState(state: string, value: boolean): void {
    if (value) {
      this.internals.states.add(state);
    } else {
      this.internals.states.delete(state);
    }
  }

  /**
   * It is used internally to set the aria-describedby attribute for the slotted input referencing available <sbb-form-error> instances.
   */
  private _onSlotErrorChange(event: Event): void {
    const errors = (event.target as HTMLSlotElement).assignedElements();
    // Remove references of removed errors from aria-describedby.
    const removedErrorIds = this._errorElements.filter((e) => !errors.includes(e)).map((e) => e.id);
    this._errorElements = errors;

    for (const el of this._errorElements) {
      // Although a form error assigns an id itself, we need to be earlier by creating one here
      if (!el.id) {
        el.id = `sbb-form-field-error-${++nextFormFieldErrorId}`;
      }
      if (!el.role) {
        // Instead of defining a container with an aria-live region as expected, we had to change
        // setting it for every slotted element to properly work in all browsers and screen reader combinations.
        el.role = 'status';
      }
    }
    this._applyAriaDescribedby(removedErrorIds);
    this._toggleState('has-error', !!this._errorElements.length);
    this._syncNegative();
  }

  private _applyAriaDescribedby(obsoleteIds: string[] = []): void {
    const ariaDescribedby = this._input?.getAttribute('aria-describedby') || '';
    const ids = ariaDescribedby
      .split(' ')
      .filter((id) => !!id && !obsoleteIds.includes(id))
      .filter((v, i, a) => a.indexOf(v) === i);

    if (this._errorElements.length) {
      this._errorElements.forEach((e) => {
        if (!ids.includes(e.id)) {
          ids.push(e.id);
        }
      });
    }

    const newAriaDescribedby = ids.join(' ');
    if (this._input && newAriaDescribedby !== ariaDescribedby) {
      if (newAriaDescribedby) {
        this._input.setAttribute('aria-describedby', newAriaDescribedby);
      } else {
        this._input.removeAttribute('aria-describedby');
      }
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
      'sbb-form-error,sbb-mini-button,sbb-popover-trigger,sbb-form-field-clear,sbb-datepicker-next-day,sbb-datepicker-previous-day,sbb-datepicker-toggle,sbb-select,sbb-autocomplete,sbb-autocomplete-grid,sbb-chip-group',
    ).forEach((element) => element.toggleAttribute('negative', this.negative));
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
}
