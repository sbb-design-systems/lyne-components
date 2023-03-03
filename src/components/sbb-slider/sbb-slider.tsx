import {
  Component,
  ComponentInterface,
  Element,
  h,
  JSX,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';
import { forwardEventToHost } from '../../global/helpers/forward-event';

/**
 * @slot prefix - Slot to render an icon on the left side of the input.
 * @slot suffix - Slot to render an icon on the right side of the input.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-slider.scss',
  tag: 'sbb-slider',
})
export class SbbSlider implements ComponentInterface {
  /** Value for the inner HTMLInputElement. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Numeric value for the inner HTMLInputElement. */
  @Prop({ mutable: true }) public valueAsNumber?: number;

  /** Name of the inner HTMLInputElement. */
  @Prop() public name?: string = '';

  /** The <form> element to associate the inner HTMLInputElement with. */
  @Prop() public form?: string;

  /** Minimum acceptable value for the inner HTMLInputElement. */
  @Prop() public min?: string = '0';

  /** Maximum acceptable value for the inner HTMLInputElement. */
  @Prop() public max?: string = '100';

  /**
   * Readonly state for the inner HTMLInputElement.
   * Since the input range does not allow this attribute, it will be merged with the `disabled` one.
   */
  @Prop() public readonly?: boolean = false;

  /** Disabled state for the inner HTMLInputElement. */
  @Prop() public disabled?: boolean = false;

  /** Name of the icon at component's start, which will be forward to the nested `sbb-icon`. */
  @Prop() public startIcon?: string;

  /** Name of the icon at component's end, which will be forward to the nested `sbb-icon`. */
  @Prop() public endIcon?: string;

  /**
   * The ratio between the absolute value and the validity interval.
   * E.g. given `min=0`, `max=100` and `value=50`, then `_valueFraction=0.5`
   */
  @State() private _valueFraction = 0;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  /** Host element */
  @Element() private _element!: HTMLElement;

  /** Reference to the inner HTMLInputElement with type='range'. */
  private _rangeInput!: HTMLInputElement;

  public connectedCallback(): void {
    this._handleChange();
  }

  @Watch('value')
  @Watch('valueAsNumber')
  private _syncValues(newValue: string | number = this._rangeInput.valueAsNumber): void {
    if (newValue && typeof newValue !== 'number') {
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
  @Watch('value')
  @Watch('valueAsNumber')
  private _handleChange(value = this._rangeInput?.valueAsNumber): void {
    let min: number, max: number;
    if (this._rangeInput) {
      min = +this._rangeInput.min;
      max = +this._rangeInput.max;
    } else {
      min = +this.min;
      max = +this.max;
      value =
        this.value && this.value !== ''
          ? +this.value
          : this.valueAsNumber
          ? this.valueAsNumber
          : +this.min + (+this.max - +this.min) / 2;
    }
    const mathFraction: number = (value - min) / (max - min);
    this._valueFraction =
      isNaN(mathFraction) || mathFraction < 0 ? 0 : mathFraction > 1 ? 1 : mathFraction;
  }

  /** Emits the change event. */
  private _emitChange(event): void {
    this._syncValues();
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  public render(): JSX.Element {
    const inputAttributes = {
      name: this.name || null,
      form: this.form || null,
      min: this.min || null,
      max: this.max || null,
      disabled: this.disabled || this.readonly || null,
      valueAsNumber: this.valueAsNumber || null,
      value: this.value || null,
    };

    return (
      <div class="sbb-slider__height-container">
        <div class="sbb-slider__wrapper">
          <slot name="prefix">{this.startIcon && <sbb-icon name={this.startIcon} />}</slot>
          <div
            class="sbb-slider__container"
            style={{
              '--sbb-slider-value-fraction': this._valueFraction.toString(),
            }}
          >
            <input
              class="sbb-slider__range-input"
              type="range"
              {...inputAttributes}
              onChange={(event: Event) => this._emitChange(event)}
              onInput={() => this._handleChange()}
              ref={(input) => (this._rangeInput = input)}
            />
            <div class="sbb-slider__line">
              <div class="sbb-slider__selected-line"></div>
            </div>
            <div class="sbb-slider__knob"></div>
          </div>
          <slot name="suffix">{this.endIcon && <sbb-icon name={this.endIcon} />}</slot>
        </div>
      </div>
    );
  }
}
