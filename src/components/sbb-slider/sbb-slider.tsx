import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import { hostContext } from '../../global/helpers/host-context';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';
import { SbbSliderChange } from './sbb-slider.custom';

/**
 * @slot prefix - Slot to render an icon on the left side of the input.
 * @slot suffix - Slot to render an icon on the right side of the input.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-slider.scss',
  tag: 'sbb-slider',
})
export class SbbSlider implements ComponentInterface, AccessibilityProperties {
  /**
   * Value for the inner HTMLInputElement.
   */
  @Prop() public value?: string = '';

  /**
   * Numeric value for the inner HTMLInputElement.
   */
  @Prop() public valueAsNumber?: number;

  /**
   * Name of the inner HTMLInputElement.
   */
  @Prop() public name?: string = '';

  /**
   * Minimum acceptable value for the inner HTMLInputElement.
   */
  @Prop() public min?: string = '0';

  /**
   * Maximum acceptable value for the inner HTMLInputElement.
   */
  @Prop() public max?: string = '100';

  /**
   * The granularity of the possible values for the inner HTMLInputElement.
   */
  @Prop() public step?: string = '';

  /**
   * Readonly state for the inner HTMLInputElement.
   * Since the input range does not allow this attribute, it will be merged with the `disabled` one.
   */
  @Prop() public readonly?: boolean = false;

  /**
   * Disabled state for the inner HTMLInputElement.
   */
  @Prop() public disabled?: boolean = false;

  /**
   * Name of the icon at component's start, which will be forward to the nested `sbb-icon`.
   */
  @Prop() public startIcon!: string;

  /**
   * Name of the icon at component's end, which will be forward to the nested `sbb-icon`.
   */
  @Prop() public endIcon!: string;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Event emitted when the value of the inner HTMLInputElement changes.
   */
  @Event() public sbbChange: EventEmitter<SbbSliderChange>;

  /**
   * The ratio between the absolute value and the validity interval.
   * E.g. given `min=0`, `max=100` and `value=50`, then `_valueFraction=0.5`
   */
  @State() private _valueFraction = 0;

  /**
   * Host element
   */
  @Element() private _element!: HTMLElement;

  /**
   * Reference to the inner HTMLInputElement with type='range'.
   */
  private _rangeInput!: HTMLInputElement;

  /**
   * Indicates if the component is used within a sbb-form-field.
   */
  private _isInFormField: boolean;

  public connectedCallback(): void {
    this._isInFormField = !!hostContext('sbb-form-field', this._element);
    this._handleChange();
  }

  /**
   * Recalculates the `_valueFraction` on change to correctly display the slider knob and lines.
   * The first calculation happens in connectedCallback(...), so since `_rangeInput` is not yet available,
   * the `min` and `max` values are used; if `value` is not provided, the default value is halfway between min and max
   * (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#value).
   */
  private _handleChange(): void {
    let min: number, max: number, value: number;
    if (this._rangeInput) {
      min = +this._rangeInput.min;
      max = +this._rangeInput.max;
      value = this._rangeInput.valueAsNumber;
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

  /**
   * Emits the change event.
   */
  private _emitChange(): void {
    this.sbbChange.emit({
      value: this._rangeInput.valueAsNumber,
      max: +this._rangeInput.max,
      min: +this._rangeInput.min,
    });
  }

  /**
   * If an end icon is provided, increases the value when clicking on it.
   */
  private _incrementWithIcon(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this._rangeInput.valueAsNumber === +this._rangeInput.max) {
      return;
    } else {
      if (this.step) {
        this._rangeInput.valueAsNumber += +this.step;
      } else {
        this._rangeInput.valueAsNumber++;
      }
      this._emitChange();
      this._handleChange();
    }
  }

  /**
   * If a start icon is provided, reduces the value when clicking on it.
   */
  private _decrementWithIcon(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this._rangeInput.valueAsNumber === +this._rangeInput.min) {
      return;
    } else {
      if (this.step) {
        this._rangeInput.valueAsNumber -= +this.step;
      } else {
        this._rangeInput.valueAsNumber--;
      }
      this._emitChange();
      this._handleChange();
    }
  }

  public render(): JSX.Element {
    const inputAttributes = {
      name: this.name || null,
      min: this.min || null,
      max: this.max || null,
      step: this.step || null,
      disabled: this.disabled || this.readonly || null,
      valueAsNumber: this.valueAsNumber || null,
      value: this.value || null,
      'aria-label': this.accessibilityLabel || null,
      'aria-describedby': this.accessibilityDescribedby || null,
      'aria-labelledby': this.accessibilityLabelledby || null,
    };
    const step = +this.step;
    const stepFraction = Number.isNaN(step)
      ? NaN
      : Math.abs((step - +this.min) / (+this.max - +this.min));
    // The width of a step must be larger than four pixels, as the gap size is four pixel and
    // the CSS calculation would only render white space if the size of a step is smaller or equal
    // to four pixels.
    // TODO: There is probably a better way to check this, as the width might also be variable.
    const isStepped = this.step && stepFraction > 0.01;

    return (
      <Host class={{ 'sbb-form-field-element': this._isInFormField }}>
        <div class="sbb-slider__wrapper">
          <slot name="prefix">
            {this.startIcon && (
              <sbb-icon name={this.startIcon} onClick={() => this._decrementWithIcon()} />
            )}
          </slot>
          <div
            class="sbb-slider__container"
            style={{
              '--sbb-slider-value-fraction': this._valueFraction.toString(),
              '--sbb-slider-step-fraction': stepFraction.toString(),
            }}
          >
            <input
              class="sbb-slider__range-input"
              type="range"
              {...inputAttributes}
              onChange={() => this._emitChange()}
              onInput={() => this._handleChange()}
              ref={(input) => (this._rangeInput = input)}
            />
            <div
              class={{
                'sbb-slider__line': !this.disabled && !this.readonly,
                'sbb-slider__line-disabled': this.disabled,
                'sbb-slider__line-readonly': this.readonly,
                'sbb-slider__line--stepped': isStepped,
              }}
            >
              <div
                class={{
                  'sbb-slider__selected-line': !this.disabled && !this.readonly,
                  'sbb-slider__selected-line-disabled': this.disabled,
                  'sbb-slider__selected-line-readonly': this.readonly,
                }}
              ></div>
            </div>
            <div
              class={{
                'sbb-slider__knob': !this.disabled && !this.readonly,
                'sbb-slider__knob-disabled': this.disabled,
                'sbb-slider__knob-readonly': this.readonly,
              }}
            ></div>
          </div>
          <slot name="suffix">
            {this.endIcon && (
              <sbb-icon name={this.endIcon} onClick={() => this._incrementWithIcon()} />
            )}
          </slot>
        </div>
      </Host>
    );
  }
}
