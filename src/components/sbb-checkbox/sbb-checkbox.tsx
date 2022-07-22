import { Component, Prop, h, Event, EventEmitter, Watch } from '@stencil/core';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox.scss',
  tag: 'sbb-checkbox',
})
export class SbbCheckbox {
  private _checkbox: HTMLInputElement;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true }) public checked: boolean;

  /** Value of checkbox. */
  @Prop() public value?: string;

  /** Name of the checkbox */
  @Prop() public name?: string;

  /** Id of the internal input element - default id will be set automatically. */
  @Prop() public inputId = `sbb-checkbox-${++nextId}`;

  //** the svg for the true state */
  @Prop() public checkIcon: 'tick-small';

  //** the svg for the true state */
  @Prop() public tristateIcon: 'minus-small';

  //** the svg for the true state */
  @Prop() public labelIcon: '';

  /** The disabled prop for the disabled state. */
  @Prop() public disabled!: boolean;

  /** The required prop for the required state. */
  @Prop() public required?: boolean;

  /** Whether the checkbox is tristated. */
  @Prop() public tristated?: boolean;

  /** The label position relative to the labelIcon. Defaults to false */
  @Prop() public labelReversed = false;

  /** Whether the checkbox label has spacing to the labelIcon. */
  @Prop() public labelSpace = false;

  /** The aria-label prop for the hidden input. */
  @Prop() public acceccibilityLabel?: string;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public acceccibilityLabelledby?: string;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public acceccibilityDescribedBy?: string;

  /** Event for emiting whenever selection is changed. */
  @Event() public sbbChange: EventEmitter;

  /** sets the string acording to the state */
  private _setState(): string {
    if (this.checked === true) {
      return 'check';
    } else if (this.tristated === true && this.checked === false) {
      return 'tristate';
    }
  }

  @Watch('checked')
  public checkedChanged(isChecked: boolean): void {
    this.sbbChange.emit({
      checked: isChecked,
      value: this.value,
    });
  }

  public render(): JSX.Element {
    const disabled = this.disabled ? 'checkbox--disabled' : '';
    const state = this._setState() ? `checkbox--${this._setState()}` : '';
    const labelReversed = this.labelReversed ? `checkbox__label--reverse` : '';
    const labelSpace = this.labelSpace ? `checkbox__label--space` : '';

    return (
      <label class={`checkbox ${disabled} ${state}`} htmlFor={this.inputId}>
        <input
          ref={(checkbox: HTMLInputElement): HTMLInputElement => (this._checkbox = checkbox)}
          type="checkbox"
          name={this.name}
          id={this.inputId}
          disabled={this.disabled}
          required={this.required}
          checked={this.checked}
          value={this.value}
          onChange={(): void => {
            this.checked = this._checkbox?.checked;
          }}
          aria-label={this.acceccibilityLabel}
          aria-labelledby={this.acceccibilityLabelledby}
          aria-describedby={this.acceccibilityDescribedBy}
        />
        <span class="checkbox__inner">
          <span class="checkbox__selection">
            <span class="checkbox__icon">
              {this._setState() ? (
                <span>
                  {this._setState() === 'check' ? (
                    <sbb-icon name={this.checkIcon} />
                  ) : (
                    <sbb-icon name={this.tristateIcon} />
                  )}
                </span>
              ) : (
                ''
              )}
            </span>
          </span>
          <span class={`checkbox__label ${labelReversed} ${labelSpace}`}>
            <slot />
            {this.labelIcon !== '' ? <sbb-icon name={this.labelIcon} /> : ''}
          </span>
        </span>
      </label>
    );
  }
}
