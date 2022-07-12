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
  @Prop() public accessibilityDescribedBy?: string;

  /** Event for emiting whenever selection is changed. */
  @Event() public sbbChange: EventEmitter;

  /** Set checked to the state of the input-checkbox. */
  private _toggle(): void {
    this.checked = this._checkbox?.checked;
  }

  /** Handles the toggle when it is undefined or changed without a click. */
  private _synchCheckState(): void {
    this._checkbox.checked = this.checked;
    if (this.checked === undefined) {
      this.checked = this._checkbox?.checked;
    }

    if (this._checkbox?.checked !== this.checked) {
      this._checkbox.checked = this.checked;
    }
  }

  @Watch('checked')
  public checkedChanged(isChecked: boolean): void {
    this.sbbChange.emit({
      checked: isChecked,
      value: this.value,
    });
    console.log('testttt');
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
          aria-describedby={this.accessibilityDescribedBy}
        />
        {this.labelPosition === 'before' ? <slot /> : ''}
        <span class={`toggle-check__slider toggle-check__slider--${this.labelPosition}`}>
          <span class="toggle-check__circle">
            {this.checked ? (
              <span class="toggle-check__tick">
                <slot name="icon">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0,0,36,36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="m28.8534,10.8683-13.5,13.485-.3536.3532-.3533-.3534-6.00002-6,.70711-.7071,5.64661,5.6467,13.1465-13.1319.7067.7075z"
                    />
                  </svg>
                </slot>
              </span>
            ) : (
              ''
            )}
          </span>
        </span>
        {this.labelPosition === 'after' ? <slot /> : ''}
      </label>
    );
  }

  public componentDidRender(): void {
    this._synchCheckState();
  }
}
