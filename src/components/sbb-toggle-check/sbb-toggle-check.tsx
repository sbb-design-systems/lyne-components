import { Component, Prop, h, Event, EventEmitter, Watch } from '@stencil/core';
import { InterfaceCheckToggleAttributes } from './sbb-link.custom';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-check.scss',
  tag: 'sbb-toggle-check',
})
export class SbbToggleCheck {
  private _checkbox: HTMLInputElement;

  /** Whether the toggle-check is checked. */
  @Prop({ mutable: true }) public checked = false;

  /** Value of toggle-check. */
  @Prop() public value?: string;

  /** Name of the toggle-check. */
  @Prop() public name?: string;

  /** Id of the internal input element - default id will be set automatically. */
  @Prop() public inputId = `sbb-checkbox-${++nextId}`;

  /** The svg name for the true state - default -> 'tick-small' */
  @Prop() public icon = 'tick-small';

  /** The disabled prop for the disabled state. */
  @Prop() public disabled!: boolean;

  /** The required prop for the required state. */
  @Prop() public required?: boolean;

  /** The label position relative to the toggle. Defaults to 'after' */
  @Prop() public labelPosition?: InterfaceCheckToggleAttributes['labelPosition'] = 'after';

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel?: string;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby?: string;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby?: string;

  /** Event for emiting whenever selection is changed. */
  @Event() public sbbChange: EventEmitter;

  /** Set checked to the state of the input-checkbox. */
  private _toggle(): void {
    this.checked = this._checkbox?.checked;
  }

  @Watch('checked')
  public checkedChanged(isChecked: boolean): void {
    this.sbbChange.emit({
      checked: isChecked,
      value: this.value,
    });
  }

  public render(): JSX.Element {
    const disabled = this.disabled ? 'toggle-check--disabled' : '';
    const checked = this.checked ? 'toggle-check--checked' : '';

    return (
      <label class={`toggle-check ${disabled} ${checked}`} htmlFor={this.inputId}>
        <input
          ref={(checkbox: HTMLInputElement): HTMLInputElement => (this._checkbox = checkbox)}
          type="checkbox"
          name={this.name}
          id={this.inputId}
          disabled={this.disabled}
          required={this.required}
          checked={this.checked}
          value={this.value}
          onChange={(event: Event): void => {
            event.stopPropagation();
            this._toggle();
          }}
          aria-label={this.accessibilityLabel}
          aria-labelledby={this.accessibilityLabelledby}
          aria-describedby={this.accessibilityDescribedby}
        />
        {this.labelPosition === 'before' ? <slot /> : ''}
        <span class={`toggle-check__slider toggle-check__slider--${this.labelPosition}`}>
          <span class="toggle-check__circle">
            {this.checked ? (
              <slot name="icon">
                <sbb-icon name={this.icon}></sbb-icon>
              </slot>
            ) : (
              ''
            )}
          </span>
        </span>
        {this.labelPosition === 'after' ? <slot /> : ''}
      </label>
    );
  }
}
