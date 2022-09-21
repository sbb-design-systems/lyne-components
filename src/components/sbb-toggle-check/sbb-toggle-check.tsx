import { Component, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { InterfaceToggleCheckAttributes, SbbToggleCheckChange } from './sbb-toggle-check.custom';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-check.scss',
  tag: 'sbb-toggle-check',
})
export class SbbToggleCheck implements AccessibilityProperties {
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
  @Prop({ reflect: true }) public disabled = false;

  /** The required prop for the required state. */
  @Prop({ reflect: true }) public required = false;

  /** The label position relative to the toggle. Defaults to 'after' */
  @Prop() public labelPosition?: InterfaceToggleCheckAttributes['labelPosition'] = 'after';

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** Emits whenever the selection has changed.  */
  @Event() public sbbChange: EventEmitter<SbbToggleCheckChange>;

  public render(): JSX.Element {
    return (
      <label
        class={{
          'toggle-check': true,
          [`toggle-check--${this.labelPosition}`]: true,
          'toggle-check--checked': this.checked,
          'toggle-check--disabled': this.disabled,
        }}
        htmlFor={this.inputId}
      >
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
            this.sbbChange.emit({
              checked: this.checked,
              value: this.value,
            });
          }}
          aria-label={this.accessibilityLabel}
          aria-describedby={this.accessibilityDescribedby}
          aria-labelledby={this.accessibilityLabelledby}
        />
        <span class="toggle-check__container">
          <slot />
          <span class="toggle-check__slider">
            <span class="toggle-check__circle">
              <slot name="icon">
                <sbb-icon name={this.icon}></sbb-icon>
              </slot>
            </span>
          </span>
        </span>
      </label>
    );
  }
}
