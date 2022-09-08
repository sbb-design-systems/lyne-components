import { Component, Prop, h, Event, EventEmitter, Watch, JSX } from '@stencil/core';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';
import { InterfaceCheckboxAttributes } from './sbb-checkbox.custom';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox.scss',
  tag: 'sbb-checkbox',
})
export class SbbCheckbox implements AccessibilityProperties {

  private _checkbox: HTMLInputElement;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true }) public checked: boolean;

  /** Value of checkbox. */
  @Prop() public value?: string;

  /** Name of the checkbox */
  @Prop() public name?: string;

  /** Id of the internal input element - default id will be set automatically. */
  @Prop() public inputId = `sbb-checkbox-${++nextId}`;

    /** The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons (optional). */
  @Prop() public iconName: '';

  /** The disabled prop for the disabled state. */
  @Prop() public disabled!: boolean;

  /** The required prop for the required state. */
  @Prop() public required?: boolean;

  /** Whether the checkbox is indeterminate. */
  @Prop() public indeterminate?: boolean;

  /** The label position relative to the labelIcon. Defaults to end */
  @Prop() public iconPlacement: InterfaceCheckboxAttributes['iconPlacement'] = 'end';

  /** Whether the checkbox label has spacing to the labelIcon. */
  @Prop() public labelSpace = false;

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby: string;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby: string;

  /** Event for emiting whenever selection is changed. */
  @Event() public sbbChange: EventEmitter;

  /** render the svg according to the state */
  private _renderStateIcon(): JSX.Element {
    if (this.indeterminate) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="2" viewBox="0 0 8 2" fill="none">
          <path
            d="M1 1H7"
            stroke="#EB0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    }

    if (this.checked) {
      return (
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.33 3.462 7 9 1"
            stroke="#EB0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    }

    return;
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
    const iconPlacement = this.iconPlacement === 'start' ? `checkbox__label--start` : '';
    const labelSpace = this.labelSpace ? `checkbox__label--space` : '';

    return (
      <label class={`checkbox ${disabled}`} htmlFor={this.inputId}>
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
            this.checked = this._checkbox?.checked;
          }}
          aria-label={this.accessibilityLabel}
          aria-labelledby={this.accessibilityLabelledby}
          aria-describedby={this.accessibilityDescribedby}
        />
        <span class="checkbox__inner">
          <span class="checkbox__selection">
            <span class="checkbox__icon">{this._renderStateIcon()}</span>
          </span>
          <span class={`checkbox__label ${iconPlacement} ${labelSpace}`}>
            <slot />
            {this.iconName !== '' ? <sbb-icon name={this.iconName} /> : ''}
          </span>
        </span>
      </label>
    );
  }
}
