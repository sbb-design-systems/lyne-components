import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { InterfaceCheckToggleAttributes } from './sbb-link.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-check.scss',
  tag: 'sbb-toggle-check',
})
export class SbbToggleCheck {
  private _checkbox: HTMLInputElement;

  /** Whether the toggle-check is checked. */
  @Prop({ mutable: true }) public checked = false;

  /** name of the toggle-check */
  @Prop() public name?: string;

  /** id of the toggle-check */
  @Prop() public toggleId: string;

  /** Id which is sent in the change event payload */
  @Prop() public eventId?: string;

  /** the svg name for the true state - default -> 'tick-small' */
  @Prop() public icon = 'tick-small';

  /** the disabled prop for the disabled state */
  @Prop() public disabled!: boolean;

  /** The label position relative to the toggle. Defaults to 'after' */
  @Prop() public labelPosition?: InterfaceCheckToggleAttributes['labelPosition'] = 'after';

  /** the aria-label prop for the hidden input */
  @Prop() public accessibilityLabel?: string;

  /** the aria-labelledby prop for the hidden input */
  @Prop() public accessibilityLabelledby?: string;

  /** the aria-describedby prop for the hidden input */
  @Prop() public accessibilityDescribedBy?: string;

  /** event for emiting whenever selection is changed */
  @Event() public changed: EventEmitter<boolean>;

  /** set checked to the state of the input-checkbox */
  private _toggle(): void {
    this.checked = this._checkbox?.checked;
  }

  /** handles the change event and toggles the checked state */
  private _changedHandler(check: boolean): void {
    this.changed.emit(check);
    this._toggle();
  }

  /** handles the toggle when it is undefined or changed without a click */
  private _synchCheckState(): void {
    this._checkbox.checked = this.checked;
    if (this.checked === undefined) {
      this.checked = this._checkbox?.checked;
    }

    if (this._checkbox?.checked !== this.checked) {
      this._checkbox.checked = this.checked;
    }
  }

  public render(): JSX.Element {
    const disabled = this.disabled ? 'toggle-check--disabled' : '';
    const checked = this.checked ? 'toggle-check--checked' : '';

    return (
      <label class={`toggle-check ${disabled} ${checked}`} htmlFor={this.toggleId}>
        <input
          ref={(checkbox: HTMLInputElement): HTMLInputElement => (this._checkbox = checkbox)}
          type="checkbox"
          name={this.name}
          id={this.toggleId}
          disabled={this.disabled}
          onChange={(): void => {
            this._changedHandler(this.checked);
            console.log(this._checkbox.checked);
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
                <slot name="icon" />
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
