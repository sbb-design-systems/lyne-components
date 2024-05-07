import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbConnectedAbortController, SbbSlotStateController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbToggleElement, SbbToggleStateChange } from '../toggle.js';

import style from './toggle-option.scss?lit&inline';

/**
 * It displays a toggle option within a `sbb-toggle`.
 *
 * @slot - Use the unnamed slot to add content to the label of the toggle option.
 * @slot icon - Slot used to render the `sbb-icon`.
 */
@customElement('sbb-toggle-option')
@hostAttributes({
  role: 'radio',
})
export class SbbToggleOptionElement extends SbbIconNameMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    stateChange: 'stateChange',
  } as const;

  /**
   * Whether the toggle-option is checked.
   */
  @property({ reflect: true, type: Boolean })
  public checked = false;

  /**
   * Whether the toggle option is disabled.
   */
  @property({ reflect: true, type: Boolean })
  public disabled: boolean = false;

  /**
   * Value of toggle-option.
   */
  @property()
  public value: string | null = null;

  private _toggle?: SbbToggleElement;

  /**
   * @internal
   * Internal event that emits whenever the state of the toggle option
   * in relation to the parent toggle changes.
   */
  private _stateChange: EventEmitter<SbbToggleStateChange> = new EventEmitter(
    this,
    SbbToggleOptionElement.events.stateChange,
    { bubbles: true },
  );

  private _abort = new SbbConnectedAbortController(this);

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('input', () => this._handleInput(), { signal });
    this.addEventListener('click', () => this.shadowRoot!.querySelector('label')?.click(), {
      signal,
    });
    // We can use closest here, as we expect the parent sbb-toggle to be in light DOM.
    this._toggle = this.closest?.('sbb-toggle') ?? undefined;
    this._verifyTabindex();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this._handleCheckedChange(this.checked, changedProperties.get('checked')!);
    }
    if (changedProperties.has('value')) {
      this._handleValueChange(this.value, changedProperties.get('value')!);
    }
    if (changedProperties.has('disabled')) {
      this._handleDisabledChange();
    }
  }

  private _handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.setAttribute('aria-checked', `${this.checked}`);
      this._stateChange.emit({ type: 'checked', checked: this.checked });
      this._verifyTabindex();
    }
  }

  private _handleValueChange(currentValue: string | null, previousValue: string | null): void {
    if (this.checked && currentValue !== previousValue) {
      this._stateChange.emit({ type: 'value', value: currentValue });
    }
  }

  private _handleDisabledChange(): void {
    // Enforce disabled state from parent.
    if (!this._toggle) {
      // Ignore illegal state. Our expectation  is that a sbb-toggle-option
      // always has a parent sbb-toggle.
    } else if (this._toggle.disabled && !this.disabled) {
      this.disabled = true;
    } else if (!this._toggle.disabled && this.disabled) {
      this.disabled = false;
    }
    setOrRemoveAttribute(this, 'aria-disabled', this.disabled ? `true` : null);
    this._verifyTabindex();
  }

  private _handleInput(): void {
    if (this.checked || this.disabled) {
      return;
    }
    this.checked = true;
  }

  private _verifyTabindex(): void {
    this.tabIndex = this.checked && !this.disabled ? 0 : -1;
  }

  protected override render(): TemplateResult {
    return html`
      <input
        type="radio"
        id="sbb-toggle-option-id"
        aria-hidden="true"
        tabindex="-1"
        ?disabled=${this.disabled}
        .checked=${this.checked || nothing}
        .value=${this.value || nothing}
        @click=${(event: PointerEvent) => event.stopPropagation()}
      />
      <label class="sbb-toggle-option" for="sbb-toggle-option-id">
        ${this.renderIconSlot()}
        <span class="sbb-toggle-option__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-option': SbbToggleOptionElement;
  }
}
