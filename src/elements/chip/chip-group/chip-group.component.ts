import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, isArrowKeyPressed } from '../../core/a11y.ts';
import { SbbLanguageController, SbbPropertyWatcherController } from '../../core/controllers.ts';
import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom/lean-context.ts';
import { i18nChipGroupInputDescription, i18nSelectionRequired } from '../../core/i18n.ts';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbFormAssociatedMixin,
  SbbNegativeMixin,
  SbbRequiredMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbFormFieldElement } from '../../form-field/form-field/form-field.component.ts';
import type { SbbOptionBaseElement } from '../../option/option/option-base-element.ts';
import { SbbChipElement } from '../chip.ts';

import style from './chip-group.scss?lit&inline';

let displayWithWarningLogged = false;

export interface SbbChipInputTokenEndEventDetails<T = string> {
  /** The element that triggered the chip creation */
  origin: 'input' | 'autocomplete';
  /**
   * The value of the new chip. Either the input or the option value depending on the origin.
   * Either the value from the input which is always `string` or the value from the selected option
   * from an autocomplete, which can be either a string or any other type.
   */
  value: T | string;
  label?: string;
  /** Set a new value for the chip that will be created */
  setValue(value: T): void;
  /** Set a label for the chip that will be created */
  setLabel(value: string): void;
}

/**
 * The `sbb-chip-group` component is used as a container for one or multiple `sbb-chip`.
 *
 * @slot - Use the unnamed slot to add `sbb-chip` elements.
 * @overrideType value - (T = string[]) | null
 */
export
@customElement('sbb-chip-group')
class SbbChipGroupElement<T = string> extends SbbRequiredMixin(
  SbbDisabledMixin(SbbNegativeMixin(SbbFormAssociatedMixin(SbbElementInternalsMixin(LitElement)))),
) {
  public static override readonly role = 'listbox';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    input: 'input',
    change: 'change',
    chipinputtokenend: 'chipinputtokenend',
  } as const;

  /** Value of the form element. */
  @property({ type: Array })
  public set value(value: (T | null)[] | null) {
    value = value ?? [];
    const oldValue = this.value;

    // Subtract from 'oldValue' the new 'value'
    // The result are the chips to remove (handle duplicates)
    const toRemove = [...oldValue];
    for (const c of value) {
      if (toRemove.includes(c)) {
        toRemove.splice(toRemove.indexOf(c), 1);
      }
    }
    toRemove.forEach((value) =>
      this._chipElements()
        .find((c) => c.value === value)
        ?.remove(),
    );

    // Subtract from the new 'value' what was already present
    // The result are the new chips to add (handle duplicates)
    const toAdd = [...value];
    for (const c of oldValue) {
      if (toAdd.includes(c)) {
        toAdd.splice(toAdd.indexOf(c), 1);
      }
    }
    toAdd.forEach((c) => this._createChipElement(c));
  }
  public get value(): (T | null)[] {
    return this._chipElements().map((c) => c.value);
  }

  /** Function that maps a chip's value to its display value. */
  @property({ attribute: false })
  public accessor displayWith: ((value: T) => string) | null = null;

  /** The array of keys that will trigger a `chipinputtokenend` event. Default `['Enter']` */
  @property({ attribute: 'separator-keys', type: Array })
  public accessor separatorKeys: string[] = ['Enter'];

  /** Whether to automatically add a chip when the input loses focus if there's a value. Defaults to `false` */
  @forceType()
  @property({ attribute: 'add-on-blur', type: Boolean })
  public accessor addOnBlur: boolean = false;

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _inputAttributeObserver = !isServer
    ? new MutationObserver(() => this._reactToInputChanges())
    : null;

  private _inputElement: HTMLInputElement | undefined;
  private _inputAbortController: AbortController | undefined;
  private _language = new SbbLanguageController(this);
  private _previousSize?: SbbFormFieldElement['size'];

  public constructor() {
    super();

    this.addEventListener?.(SbbChipElement.events.requestdelete, (ev) =>
      this._deleteChip(ev.target as SbbChipElement<T>),
    );

    this.addEventListener?.('keydown', (ev) => this._onChipKeyDown(ev));

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-form-field'), {
        size: (formField) => this._updateSize(formField.size),
        label: (formField) => this._updateLabelState(formField),
        hiddenLabel: (formField) => this._updateLabelState(formField),
      }),
    );
  }

  private _updateLabelState(formField: SbbFormFieldElement): void {
    this.toggleState('without-label', !formField.label || formField.hiddenLabel);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setupComponent();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (
      changedProperties.has('disabled') ||
      changedProperties.has('formDisabled') ||
      changedProperties.has('negative')
    ) {
      this._proxyStateToChips();
    }
  }

  /** @internal */
  public formResetCallback(): void {
    this.value = null;
  }

  /** @internal */
  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (!state) {
      this.value = null;
      return;
    }

    this._readFormData(state as FormData).then((array) => (this.value = array));
  }

  private async _readFormData(formData: FormData): Promise<T[]> {
    return Promise.all(
      formData
        .getAll(this.name)
        .map(async (entry) =>
          entry instanceof Blob ? JSON.parse(await entry.text()) : (entry as T),
        ),
    );
  }

  protected override shouldValidate(name: PropertyKey | undefined): boolean {
    return super.shouldValidate(name) || name === 'required' || name === 'value';
  }

  protected override validate(): void {
    super.validate();
    if (this.required && this.value.length === 0) {
      this.setValidityFlag('valueMissing', i18nSelectionRequired[this._language.current]);
    } else {
      this.removeValidityFlag('valueMissing');
    }
  }

  /** Return the list of chip elements **/
  private _chipElements(): SbbChipElement<T>[] {
    return Array.from(this.querySelectorAll?.<SbbChipElement<T>>('sbb-chip') ?? []);
  }

  /** Return the list of enabled chip elements **/
  private _enabledChipElements(): SbbChipElement<T>[] {
    return Array.from(this.querySelectorAll?.('sbb-chip:not([disabled])') ?? []);
  }

  private _setupComponent(): void {
    const input = this.querySelector('input');

    // Connect to the input
    if (input && input !== this._inputElement) {
      this._inputAbortController?.abort();
      this._inputAttributeObserver?.disconnect();
      this._inputElement = input;

      this._inputAbortController = new AbortController();
      this._inputElement.addEventListener('keydown', (ev) => this._onInputKeyDown(ev), {
        signal: this._inputAbortController.signal,
      });
      this._inputElement.addEventListener('blur', () => this._onInputBlur(), {
        signal: this._inputAbortController.signal,
      });
      this._inputElement.addEventListener(
        'inputAutocomplete',
        (event: CustomEvent<{ option: SbbOptionBaseElement<T> }>) => {
          this._createChipFromInput('autocomplete', event.detail?.option.value);
        },
        {
          signal: this._inputAbortController.signal,
        },
      );

      this._inputAttributeObserver?.observe(this._inputElement, {
        attributes: true,
        attributeFilter: ['readonly', 'disabled'],
      });
    }

    // Inherit size from the form-field and observe for changes
    if (!this._previousSize || !this.closest('sbb-form-field')) {
      this._updateSize(isLean() ? 's' : 'm');
    }

    this.toggleState('empty', this.value.length === 0);
    this._reactToInputChanges();
    this._updateInputDescription();
    this.updateFormValue();
  }

  /**
   * Listen for keyboard events on the chip elements
   **/
  private _onChipKeyDown(event: KeyboardEvent): void {
    const eventTarget = event.target as SbbChipElement<T>;
    if (eventTarget.localName !== 'sbb-chip') {
      return;
    }

    // Arrow keys allow navigation between chips focus steps
    if (isArrowKeyPressed(event)) {
      const focusSteps = this._enabledChipElements();
      const next = getNextElementIndex(event, focusSteps.indexOf(eventTarget), focusSteps.length);
      focusSteps[next].focus();
      return;
    }

    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        if (!eventTarget.readOnly && !eventTarget.disabled) {
          event.preventDefault();
          this._deleteChip(eventTarget);
        }
        break;
    }
  }

  /**
   * Listen for keyboard events on the input
   **/
  private _onInputKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Backspace':
      case 'ArrowLeft':
        if (!this._inputElement!.value) {
          this._focusChip();
        }
        break;
      case 'Enter':
        event.preventDefault(); // Prevents the form submit
        break;
    }

    // if the user typed one of the separator keys, trigger a 'chipinputtokenend' event
    if (this.separatorKeys.includes(event.key)) {
      event.preventDefault(); // prevent typing the separator key into the input
      this._createChipFromInput('input');
    }
  }

  /**
   * Handle blur event on the input
   **/
  private _onInputBlur(): void {
    if (this.addOnBlur) {
      this._createChipFromInput('input');
    }
  }

  /**
   * If the input is not empty, create a chip with its value
   */
  private _createChipFromInput(origin: 'input' | 'autocomplete' = 'input', value?: T): void {
    const inputValue = value ?? this._inputElement!.value.trim();
    if (!inputValue) {
      return;
    }

    const eventDetail: SbbChipInputTokenEndEventDetails<T> = {
      origin: origin,
      value: inputValue,
      label: (value ? this.displayWith?.(value) : null) ?? undefined,
      setValue: (value: T) => (eventDetail.value = value),
      setLabel: (label: string) => (eventDetail.label = label),
    };

    if (!this._dispatchChipInputTokenEnd(eventDetail)) {
      return; // event prevented; do nothing (the consumer has to create the chip)
    }

    this._createChipElement(eventDetail.value as T, eventDetail.label);
    this._inputElement!.value = ''; // Empty the input
    this._emitInputEvents();
  }

  private _dispatchChipInputTokenEnd(eventDetail: SbbChipInputTokenEndEventDetails<T>): boolean {
    /**
     * @type {CustomEvent<SbbChipInputTokenEndEventDetails>}
     * Notifies that a chip is about to be created. Can be prevented.
     */
    return this.dispatchEvent(
      new CustomEvent<SbbChipInputTokenEndEventDetails<T>>('chipinputtokenend', {
        detail: eventDetail,
        cancelable: true,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _deleteChip(chip: SbbChipElement<T>): void {
    const chips = this._enabledChipElements();
    chip.remove();
    this._emitInputEvents();
    this._focusChip(chips.indexOf(chip)); // Focus the next chip
  }

  /**
   * Focus an enabled chip. If none are present, focus the input
   * @param index The index of the enabled chip. If null, focus the last one.
   */
  private _focusChip(index?: number): void {
    const enabledChips = this._enabledChipElements();

    if (index !== undefined && enabledChips[index]) {
      enabledChips[index].focus();
      return;
    }

    if (enabledChips.length > 0) {
      enabledChips[enabledChips.length - 1].focus();
      return;
    }

    this._inputElement?.focus();
  }

  private _emitInputEvents(): void {
    /** The input event fires when the value has been changed as a direct result of a user action. */
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    /**
     * The change event is fired when the user modifies the element's value.
     * Unlike the input event, the change event is not necessarily fired
     * for each alteration to an element's value.
     */
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  private _createChipElement(value: T | null, label?: string): void {
    if (isServer) {
      return;
    }
    const newChip = document.createElement('sbb-chip') as SbbChipElement<T>;
    newChip.value = value;
    newChip.innerText = label ?? (value ? this.displayWith?.(value) : null) ?? '';
    if (
      import.meta.env.DEV &&
      !displayWithWarningLogged &&
      !label &&
      typeof value === 'object' &&
      !this.displayWith
    ) {
      console.warn(
        `displayWith has not been set yet for sbb-chip-group and value is an object.
         If you are using object values, you need to provide displayWidth before
         setting or selecting any value.`,
      );
      displayWithWarningLogged = true;
    }
    this.insertBefore(newChip, this._inputElement ?? this.querySelector('input'));
  }

  private _reactToInputChanges(): void {
    this.disabled = this._inputElement?.disabled ?? false;
    this._proxyStateToChips();
  }

  private _proxyStateToChips(): void {
    this._chipElements().forEach((c) => {
      c.disabled = this.disabled || this.formDisabled;
      c.readOnly = this._inputElement?.hasAttribute('readonly') ?? false;
      c.negative = this.negative;
    });
  }

  private _updateSize(size: SbbFormFieldElement['size']): void {
    if (this._previousSize) {
      this.internals.states.delete(`size-${this._previousSize}`);
    }
    this._previousSize = size;
    if (this._previousSize) {
      this.internals.states.add(`size-${this._previousSize}`);
    }
  }

  private _updateInputDescription(): void {
    if (!this._inputElement) {
      return;
    }
    this._inputElement.setAttribute(
      'aria-description',
      `${i18nChipGroupInputDescription[this._language.current]} ${this.value.length}`,
    );
  }

  protected override render(): TemplateResult {
    return html`<slot @slotchange=${this._setupComponent}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip-group': SbbChipGroupElement;
  }
}

declare global {
  interface HTMLElementEventMap {
    chipinputtokenend: CustomEvent<SbbChipInputTokenEndEventDetails<any>>;
  }
}
