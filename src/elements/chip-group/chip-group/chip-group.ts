import { type CSSResultGroup, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbFormAssociatedMixin,
} from '../../core/mixins.js';
import { SbbChipElement } from '../chip/chip.js';

import style from './chip-group.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<void>} change - Notifies that the component's value has changed.
 * @event {CustomEvent<void>} input - Notifies that the component's value has changed.
 * @slot - Use the unnamed slot to add `sbb-chip` elements.
 */
export
@customElement('sbb-chip-group')
@hostAttributes({
  tabindex: '0',
})
class SbbChipGroupElement extends SbbFormAssociatedMixin<typeof LitElement, string[]>(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    input: 'input',
    change: 'change',
  } as const;

  /** Value of the form element. */
  @property()
  public override set value(value: string[] | null) {
    value = value ?? [];
    super.value = value;
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
  public override get value(): string[] {
    return this._chipElements().map((c) => c.value);
  }

  /** Notifies that the component's value has changed. */
  private _change: EventEmitter = new EventEmitter(this, SbbChipGroupElement.events.change);

  /** Notifies that an option value has been selected. */
  private _input: EventEmitter = new EventEmitter(this, SbbChipGroupElement.events.input);

  private _inputElement: HTMLInputElement | undefined;
  private _inputAbortController: AbortController | undefined;

  public constructor() {
    super();
    this.addEventListener(SbbChipElement.events.requestDelete, (ev) =>
      this._deleteChip(ev.target as SbbChipElement),
    );

    this.addEventListener('focus', () => this._focusLastChip());

    this.addEventListener('keydown', (ev) => this._onChipKeyDown(ev));
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

    // the state format is ['field-name', 'value'][]
    this.value = (state as [string, string][]).map((entries) => entries[1]);
  }

  protected updateFormValue(): void {
    console.log('update form value', this.value);

    const data = new FormData();
    this.value.forEach((el) => data.append(this.name, el));
    this.internals.setFormValue(data);
  }

  /** Return the list of chip elements **/
  private _chipElements(): SbbChipElement[] {
    return Array.from(this.querySelectorAll('sbb-chip'));
  }

  /** Return the list of enabled chip elements **/
  private _enabledChipElements(): SbbChipElement[] {
    return Array.from(this.querySelectorAll('sbb-chip:not([disabled])'));
  }

  private _onSlotChange(): void {
    const input = this.querySelector('input');

    // Connect to the input
    if (input && input !== this._inputElement) {
      this._inputAbortController?.abort();
      this._inputElement = input;

      this._inputAbortController = new AbortController();
      this._inputElement.addEventListener('keydown', (ev) => this._onInputKeyDown(ev), {
        signal: this._inputAbortController.signal,
      });
    }

    this.updateFormValue();
  }

  /**
   * Listen for keyboard events on the chip elements
   **/
  private _onChipKeyDown(event: KeyboardEvent): void {
    const eventTarget = event.target as HTMLElement;
    if (eventTarget.localName !== 'sbb-chip') {
      return;
    }

    switch (event.key) {
      case 'Backspace':
        this._deleteChip(eventTarget as SbbChipElement);
        this._focusLastChip();
        break;
      case 'Tab':
        if (event.shiftKey) {
          this._allowFocusEscape();
        }
        break;
    }
  }

  /**
   * Listen for keyboard events on the input
   **/
  private _onInputKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this._inputElement!.value.trim()) {
          this.value = [...this.value, this._inputElement!.value];
          this._emitInputEvents();
        }
        break;
      case 'Backspace':
        this._focusLastChip();
        break;
      case 'Tab':
        if (event.shiftKey && this._enabledChipElements().length === 0) {
          this._allowFocusEscape();
        }
        break;
    }
  }

  private _deleteChip(chip: SbbChipElement): void {
    chip.remove();
    this._emitInputEvents();
  }

  /**
   * Focus the last enabled chip. If none are present, focus the input
   */
  private _focusLastChip(): void {
    const enabledChips = this._enabledChipElements();
    if (enabledChips.length > 0) {
      enabledChips[enabledChips.length - 1].focus();
    } else {
      this._inputElement?.focus();
    }
  }

  private _emitInputEvents(): void {
    this._input.emit();
    this._change.emit();
  }

  private _createChipElement(value: string): void {
    const newChip = document.createElement('sbb-chip');
    newChip.setAttribute('value', value);
    this.insertBefore(newChip, this._inputElement!);
  }

  /**
   * Removes the `tabindex` from the chip-group and resets it back afterward, allowing the
   * user to tab out of it. This prevents the set from capturing focus and redirecting
   * it back to the last chip, creating a focus trap, if the user tries to tab away.
   */
  private _allowFocusEscape(): void {
    if (this.tabIndex !== -1) {
      const previousTabIndex = this.tabIndex;
      this.tabIndex = -1;

      // Note that this needs to be a `setTimeout`, because a `Promise.resolve`
      // doesn't allow enough time for the focus to escape.
      setTimeout(() => (this.tabIndex = previousTabIndex));
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip-group">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip-group': SbbChipGroupElement;
  }
}
