import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import { hostContext } from '../../global/helpers/host-context';
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
export class SbbSlider {
  /**
   * Value for the inner HTMLInputElement.
   */
  @Prop() public value?: string = '';

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
  @Prop() public startIcon?: string;

  /**
   * Name of the icon at component's end, which will be forward to the nested `sbb-icon`.
   */
  @Prop() public endIcon?: string;

  /**
   * Event emitted when the value of the inner HTMLInputElement changes.
   */
  @Event() public sbbChange: EventEmitter<SbbSliderChange>;

  /**
   * The ratio between the absolute value and the validity interval.
   * E.g. given `min=0`, `max=100` and `value=50`, then `_valueFraction=0.5`
   */
  @State() private _valueFraction = 0;

  @Element() private _element!: HTMLElement;

  /**
   * Reference to the inner HTMLInputElement with type='range'.
   */
  private _rangeInput!: HTMLInputElement;

  private _isInFormField: boolean;

  public connectedCallback(): void {
    this._isInFormField = !!hostContext('sbb-form-field', this._element.parentElement);
  }

  private _handleChange(): void {
    const value = this._rangeInput.valueAsNumber;
    const min = +this._rangeInput.min;
    const max = +this._rangeInput.max;
    this._valueFraction = (value - min) / (max - min);
  }

  private _emitChange(): void {
    this.sbbChange.emit({
      value: this._rangeInput.valueAsNumber,
      max: +this._rangeInput.max,
      min: +this._rangeInput.min,
    });
  }

  private _incrementWithIcon(): void {
    if (!this.disabled && !this.readonly) {
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
  }

  private _decrementWithIcon(): void {
    if (!this.disabled && !this.readonly) {
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
  }

  public render(): JSX.Element {
    const inputAttributes = {
      value: this.value || null,
      name: this.name || null,
      min: this.min || null,
      max: this.max || null,
      step: this.step || null,
      disabled: this.disabled || this.readonly || null,
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
        <div class="slider__wrapper">
          <sbb-icon slot="prefix" name={this.startIcon} onClick={() => this._decrementWithIcon()} />
          <div
            class="slider__container"
            style={{
              '--slider-value-fraction': this._valueFraction.toString(),
              '--slider-step-fraction': stepFraction.toString(),
            }}
          >
            <input
              ref={(e) => {
                this._rangeInput = e;
                this._handleChange();
              }}
              class="slider__range-input"
              type="range"
              {...inputAttributes}
              onChange={() => this._emitChange()}
              onInput={() => this._handleChange()}
            ></input>
            <div
              class={{
                slider__line: !this.disabled && !this.readonly,
                'slider__line-disabled': this.disabled,
                'slider__line-readonly': this.readonly,
                'slider__line--stepped': isStepped,
              }}
            >
              <div
                class={{
                  'slider__selected-line': !this.disabled && !this.readonly,
                  'slider__selected-line-disabled': this.disabled,
                  'slider__selected-line-readonly': this.readonly,
                }}
              ></div>
            </div>
            <div
              class={{
                slider__knob: !this.disabled && !this.readonly,
                'slider__knob-disabled': this.disabled,
                'slider__knob-readonly': this.readonly,
              }}
            ></div>
          </div>
          <sbb-icon slot="suffix" name={this.endIcon} onClick={() => this._incrementWithIcon()} />
        </div>
      </Host>
    );
  }
}
