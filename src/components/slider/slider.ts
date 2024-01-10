import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult, PropertyValues } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

import { setAttributes } from '../core/dom';
import { forwardEventToHost, EventEmitter, ConnectedAbortController } from '../core/eventing';

import style from './slider.scss?lit&inline';
import '../icon';

/**
 * It displays an input knob that can be moved in a range.
 *
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 */
@customElement('sbb-slider')
export class SbbSliderElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
  } as const;

  /** Value for the inner HTMLInputElement. */
  @property() public value?: string = '';

  /** Numeric value for the inner HTMLInputElement. */
  @property({ attribute: 'value-as-number', type: Number }) public valueAsNumber?: number;

  /** Name of the inner HTMLInputElement. */
  @property({ reflect: true }) public name?: string = '';

  /** The <form> element to associate the inner HTMLInputElement with. */
  @property() public form?: string;

  /** Minimum acceptable value for the inner HTMLInputElement. */
  @property() public min?: string = '0';

  /** Maximum acceptable value for the inner HTMLInputElement. */
  @property() public max?: string = '100';

  /**
   * Readonly state for the inner HTMLInputElement.
   * Since the input range does not allow this attribute, it will be merged with the `disabled` one.
   */
  @property({ type: Boolean }) public readonly?: boolean = false;

  /** Disabled state for the inner HTMLInputElement. */
  @property({ reflect: true, type: Boolean }) public disabled?: boolean = false;

  /** Name of the icon at component's start, which will be forward to the nested `sbb-icon`. */
  @property({ attribute: 'start-icon' }) public startIcon?: string;

  /** Name of the icon at component's end, which will be forward to the nested `sbb-icon`. */
  @property({ attribute: 'end-icon' }) public endIcon?: string;

  /**
   * The ratio between the absolute value and the validity interval.
   * E.g. given `min=0`, `max=100` and `value=50`, then `_valueFraction=0.5`
   */
  @state() private _valueFraction = 0;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbSliderElement.events.didChange, {
    bubbles: true,
    cancelable: true,
  });

  /** Reference to the inner HTMLInputElement with type='range'. */
  private _rangeInput!: HTMLInputElement;

  private _abort = new ConnectedAbortController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('keydown', (e) => this._handleKeydown(e), { signal });
    this._handleChange();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value')) {
      this._handleChange(Number(this.value));
    } else if (changedProperties.has('valueAsNumber')) {
      this._handleChange(Number(this.valueAsNumber));
    }
  }

  private _syncValues(newValue: string | number): void {
    if (newValue == null) {
      return;
    } else if (newValue && typeof newValue !== 'number') {
      newValue = +newValue;
    }

    this.value = newValue.toString();
    this.valueAsNumber = newValue as number;
  }

  /**
   * Recalculates the `_valueFraction` on change to correctly display the slider knob and lines.
   * The first calculation happens in connectedCallback(...), so since `_rangeInput` is not yet available,
   * the `min` and `max` values are used; if `value` is not provided, the default value is halfway between min and max
   * (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#value).
   */
  private _handleChange(value: number = this._rangeInput?.valueAsNumber): void {
    let min: number, max: number;
    if (this._rangeInput) {
      min = +this._rangeInput.min;
      max = +this._rangeInput.max;
    } else {
      min = +(this.min as string);
      max = +(this.max as string);
      value =
        this.value && this.value !== ''
          ? +this.value
          : this.valueAsNumber
            ? this.valueAsNumber
            : +(this.min as string) + (+(this.max as string) - +(this.min as string)) / 2;
    }
    const mathFraction: number = (value - min) / (max - min);
    this._valueFraction =
      isNaN(mathFraction) || mathFraction < 0 ? 0 : mathFraction > 1 ? 1 : mathFraction;
    this._syncValues(value);
  }

  private async _handleKeydown(event: KeyboardEvent): Promise<void> {
    if (event.key !== 'Tab') {
      event.preventDefault();
    }

    if (this.disabled || this.readonly) {
      return;
    }

    if (event.key === 'Home') {
      this._rangeInput.value = this._rangeInput.min;
    } else if (event.key === 'End') {
      this._rangeInput.value = this._rangeInput.max;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      this._rangeInput.stepDown();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      this._rangeInput.stepUp();
    } else if (event.key === 'PageDown') {
      this._rangeInput.stepDown((+this._rangeInput.max - +this._rangeInput.min) / 10);
    } else if (event.key === 'PageUp') {
      this._rangeInput.stepUp((+this._rangeInput.max - +this._rangeInput.min) / 10);
    } else {
      return;
    }

    this._handleChange();
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, cancelable: true, composed: true }),
    );
    this._emitChange(new Event('change', { bubbles: true, cancelable: true, composed: true }));
  }

  /** Emits the change event. */
  private _emitChange(event: Event): void {
    forwardEventToHost(event, this);
    this._didChange.emit();
  }

  protected override render(): TemplateResult {
    const hostAttributes = {
      role: 'slider',
      tabIndex: this.disabled ? null : '0',
      'aria-valuemin': this.min || null,
      'aria-valuemax': this.max || null,
      'aria-valuenow': this.value || null,
      'aria-readonly': this.readonly?.toString() ?? 'false',
      'aria-disabled': this.disabled?.toString() ?? 'false',
    };
    const inputAttributes = {
      tabIndex: -1,
      name: this.name || null,
      min: this.min || null,
      max: this.max || null,
      disabled: this.disabled || this.readonly || null,
      valueAsNumber: this.valueAsNumber || null,
      value: this.value || null,
    };

    setAttributes(this, hostAttributes);

    return html`
      <div class="sbb-slider__height-container">
        <div class="sbb-slider__wrapper">
          <slot name="prefix">
            ${this.startIcon ? html`<sbb-icon name="${this.startIcon}"></sbb-icon>` : nothing}
          </slot>
          <div
            class="sbb-slider__container"
            style=${styleMap({ '--sbb-slider-value-fraction': this._valueFraction.toString() })}
          >
            <input
              ${spread(inputAttributes)}
              class="sbb-slider__range-input"
              type="range"
              @change=${(event: Event) => this._emitChange(event)}
              @input=${() => this._handleChange()}
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
