import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { forceType, hostAttributes } from '../core/decorators.ts';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbFormAssociatedMixin,
  SbbReadonlyMixin,
} from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';

import style from './slider.scss?lit&inline';

import '../icon.ts';

/**
 * It displays an input knob that can be moved in a range.
 *
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 */
export
@customElement('sbb-slider')
@hostAttributes({
  tabindex: '0',
})
class SbbSliderElement extends SbbDisabledMixin(
  SbbReadonlyMixin(SbbFormAssociatedMixin(SbbElementInternalsMixin(LitElement))),
) {
  public static override readonly role = 'slider';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    didChange: 'didChange',
  } as const;

  /**
   * Value of the form element.
   * If no value is provided, default is the middle point between min and max.
   */
  @property()
  public set value(value: string | null) {
    if (this._isValidNumber(value)) {
      this._value = this._boundBetweenMinMax(value);
    } else {
      this._value = null;
    }
    this.internals.ariaValueNow = this.value;
  }
  public get value(): string {
    return this._value ?? this._defaultValue();
  }
  private _value: string | null = null;

  /** Numeric value for the inner HTMLInputElement. */
  @property({ attribute: 'value-as-number', type: Number })
  public set valueAsNumber(value: number | null) {
    this.value = value?.toString() ?? null;
  }
  public get valueAsNumber(): number | null {
    return Number(this.value);
  }

  /** Minimum acceptable value for the inner HTMLInputElement. */
  @property()
  public set min(value: string) {
    if (!this._isValidNumber(value)) {
      return;
    }

    this._min = value;
    this.internals.ariaValueMin = this.min;
    const boundValue = this._boundBetweenMinMax(this.value);
    if (this.value !== boundValue) {
      this.value = boundValue;
    }
  }
  public get min(): string {
    return this._min;
  }
  private _min: string = '0';

  /** Maximum acceptable value for the inner HTMLInputElement. */
  @property()
  public set max(value: string) {
    if (!this._isValidNumber(value)) {
      return;
    }

    this._max = value;
    this.internals.ariaValueMax = this.max;
    const boundValue = this._boundBetweenMinMax(this.value);
    if (this.value !== boundValue) {
      this.value = boundValue;
    }
  }
  public get max(): string {
    return this._max;
  }
  private _max: string = '100';

  /** Name of the icon at component's start, which will be forward to the nested `sbb-icon`. */
  @forceType()
  @property({ attribute: 'start-icon' })
  public accessor startIcon: string = '';

  /** Name of the icon at component's end, which will be forward to the nested `sbb-icon`. */
  @forceType()
  @property({ attribute: 'end-icon' })
  public accessor endIcon: string = '';

  /**
   * Form type of element.
   * @default 'range'
   */
  public override get type(): string {
    return 'range';
  }

  /** Reference to the inner HTMLInputElement with type='range'. */
  private _rangeInput!: HTMLInputElement;

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeydown(e));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('readOnly')) {
      this.internals.ariaReadOnly = Boolean(this.readOnly).toString();
    }
    this.style?.setProperty('--sbb-slider-value-fraction', this._valueFraction().toString());
  }

  /**
   * The reset value is the attribute value (the setup value). If not present, calculates the default.
   * @internal
   */
  public formResetCallback(): void {
    this.value = this.getAttribute('value') ?? this._defaultValue();
  }

  /**
   * @internal
   */
  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    this.value = state as string | null;
  }

  /**
   *  If no value is provided, default is the middle point between min and max
   *  (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#value)
   */
  private _defaultValue(): string {
    return (+this.min + (+this.max - +this.min) / 2).toString();
  }

  private _isValidNumber(value: string | null): value is string {
    return !!value && !isNaN(Number(value));
  }

  /**
   * Restrains the value between the min and max
   */
  private _boundBetweenMinMax(value: string): string {
    return Math.max(+this.min, Math.min(+this.max, +value)).toString();
  }

  private _valueFraction(): number {
    const value = this.valueAsNumber!;
    const min = +this.min;
    const max = +this.max;

    const mathFraction: number = (value - min) / (max - min);
    return isNaN(mathFraction) ? 0 : Math.max(0, Math.min(1, mathFraction));
  }

  private async _handleKeydown(event: KeyboardEvent): Promise<void> {
    if (event.key !== 'Tab') {
      event.preventDefault();
    }

    if (this.readOnly) {
      return;
    }

    if (event.key === 'Home') {
      this._rangeInput.value = this.min;
    } else if (event.key === 'End') {
      this._rangeInput.value = this.max;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      this._rangeInput.stepDown();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      this._rangeInput.stepUp();
    } else if (event.key === 'PageDown') {
      this._rangeInput.stepDown((+this.max - +this.min) / 10);
    } else if (event.key === 'PageUp') {
      this._rangeInput.stepUp((+this.max - +this.min) / 10);
    } else {
      return;
    }

    // We have to manually fire events because programmatic changes don't trigger them
    this._rangeInput.dispatchEvent(
      new InputEvent('input', { bubbles: true, cancelable: true, composed: true }),
    );
    this._rangeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /** Emits the change event. */
  private _dispatchChangeEvent(): void {
    /**
     * The change event is fired when the user modifies the element's value.
     * Unlike the input event, the change event is not necessarily fired
     * for each alteration to an element's value.
     */
    this.dispatchEvent(new Event('change', { bubbles: true }));

    /**
     * Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.
     * @deprecated
     */
    this.dispatchEvent(new Event('didChange', { bubbles: true }));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-slider__height-container">
        <div class="sbb-slider__wrapper">
          <slot name="prefix">
            ${this.startIcon ? html`<sbb-icon name="${this.startIcon}"></sbb-icon>` : nothing}
          </slot>
          <div class="sbb-slider__container">
            <input
              tabindex="-1"
              min=${this.min}
              max=${this.max}
              ?disabled=${this.disabled || this.formDisabled || this.readOnly}
              value=${this.value || nothing}
              class="sbb-slider__range-input"
              type="range"
              @change=${() => this._dispatchChangeEvent()}
              @input=${() => (this.value = this._rangeInput.value)}
              ${ref((input?: Element) => (this._rangeInput = input as HTMLInputElement))}
            />
            <div class="sbb-slider__line">
              <div class="sbb-slider__selected-line"></div>
            </div>
            <div class="sbb-slider__knob"></div>
          </div>
          <slot name="suffix">
            ${this.endIcon ? html`<sbb-icon name="${this.endIcon}"></sbb-icon>` : nothing}
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-slider': SbbSliderElement;
  }
}
