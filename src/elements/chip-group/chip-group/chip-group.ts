import { type CSSResultGroup, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-chip-group')
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

    // chip to remove
    const toRemove = oldValue.filter((c) => !value.includes(c));
    this._chipElements()
      .filter((c) => toRemove.includes(c.value))
      .forEach((c) => c.remove());

    // new chip to add
    const toAdd = value.filter((c) => !oldValue.includes(c));
    toAdd.forEach((c) => this._createChip(c));
  }
  public override get value(): string[] {
    return this._chipElements().map((c) => c.value);
  }

  private _inputElement: HTMLInputElement | undefined;
  private _inputAbortController: AbortController | undefined;

  public constructor() {
    super();
    this.addEventListener(SbbChipElement.events.requestDelete, (ev) =>
      this._deleteChip(ev.target as SbbChipElement),
    );
  }

  /** @internal */
  public formResetCallback(): void {
    this.value = [];
  }

  /** @internal */
  public formStateRestoreCallback(
    _state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    // TODO
  }

  protected updateFormValue(): void {
    console.log('update form value', this.value);
    // TODO
  }

  private _chipElements(): SbbChipElement[] {
    return Array.from(this.querySelectorAll('sbb-chip'));
  }

  private _onSlotChange(): void {
    const input = this.querySelector('input');

    // Connect to the input
    if (input && input !== this._inputElement) {
      this._inputAbortController?.abort();
      this._inputElement = input;

      this._inputAbortController = new AbortController();
      this._inputElement.addEventListener('keydown', (ev) => this._onKeyDown(ev), {
        signal: this._inputAbortController.signal,
      });
    }

    this.updateFormValue();
  }

  private _onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.value = [...this.value, this._inputElement!.value];
        break;
      case 'Delete':
        // TODO If empty, focus last chip
        break;
    }
  }

  private _createChip(value: string): void {
    const newChip = document.createElement('sbb-chip');
    newChip.setAttribute('value', value);
    this.insertBefore(newChip, this._inputElement!);
  }

  private _deleteChip(chip: SbbChipElement): void {
    chip.remove();
    // TODO emit input events
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
