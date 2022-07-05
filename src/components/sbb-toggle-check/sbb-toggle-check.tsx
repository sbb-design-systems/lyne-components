import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { InterfaceCheckToggleAttributes } from './sbb-link.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-toggle-check.default.scss',
    shared: 'styles/sbb-toggle-check.shared.scss',
  },
  tag: 'sbb-toggle-check',
})
export class SbbToggleCheck {
  private _checkbox: HTMLInputElement;

  // checked
  @Prop({ mutable: true }) public checked: boolean;

  // name of the toggle-check
  @Prop() public name?: string;

  // id of the toggle-check
  @Prop() public toggleId: string;

  /** Id which is sent in the change event payload */
  @Prop() public eventId?: string;

  // the svg for the true state
  @Prop() public icon = 'tick-small';

  @Prop() public disabled!: boolean;

  /** The label position relative to the toggle. Defaults to 'after' */
  @Prop() public labelPosition?: InterfaceCheckToggleAttributes['labelPosition'] = 'after';

  @Prop() public acceccibilityLabel?: string;

  @Prop() public acceccibilityLabelledby?: string;

  @Prop() public acceccibilityDescribedBy?: string;

  //event for emiting whenever selection is changed
  @Event() public changed: EventEmitter<boolean>;

  public changedHandler(check: boolean): void {
    this.changed.emit(check);
    this.toggle();
  }

  public componentDidRender(): void {
    this.synchCheckState();
  }

  // handles the toggle when it is undefined or changed without a click
  public synchCheckState(): void {
    if (this.checked === undefined) {
      this.checked = this._checkbox?.checked;
    }

    if (this.checked !== this._checkbox?.checked) {
      this._checkbox.checked = this.checked;
    }
  }

  // set checked to the state of the input-checkbox
  public toggle(): void {
    this.checked = this._checkbox?.checked;
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
            this.changedHandler(this.checked);
          }}
          aria-label={this.acceccibilityLabel}
          aria-labelledby={this.acceccibilityLabelledby}
          aria-describedby={this.acceccibilityDescribedBy}
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
}
