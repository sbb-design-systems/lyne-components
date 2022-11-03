import { Component, Prop, h, Event, EventEmitter, Watch, JSX } from '@stencil/core';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';
import { InterfaceCheckboxAttributes, SbbCheckboxChange } from './sbb-checkbox.custom';

let nextId = 0;

/**
 * @slot icon - Slot used to render the checkbox icon.
 * @slot unnamed - Slot used to render the checkbox label's text.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox.scss',
  tag: 'sbb-checkbox',
})
export class SbbCheckbox implements AccessibilityProperties {
  private _checkbox: HTMLInputElement;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) public checked: boolean;

  /** Value of checkbox. */
  @Prop() public value?: string;

  /** Name of the checkbox */
  @Prop() public name?: string;

  /** Id of the internal input element - default id will be set automatically. */
  @Prop() public inputId = `sbb-checkbox-${++nextId}`;

  /** The disabled prop for the disabled state. */
  @Prop({ reflect: true }) public disabled = false;

  /** The required prop for the required state. */
  @Prop({ reflect: true }) public required = false;

  /** Whether the checkbox is indeterminate. */
  @Prop({ reflect: true }) public indeterminate = false;

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from here https://lyne.sbb.ch/tokens/icons (optional).
   */
  @Prop() public iconName?: string;

  /** The label position relative to the labelIcon. Defaults to end */
  @Prop({ reflect: true }) public iconPlacement: InterfaceCheckboxAttributes['iconPlacement'] =
    'end';

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** Event for emitting whenever selection is changed. */
  @Event() public sbbChange: EventEmitter<SbbCheckboxChange>;

  @Watch('checked')
  public checkedChanged(isChecked: boolean): void {
    this.sbbChange.emit({
      checked: isChecked,
      value: this.value,
    });
  }

  public render(): JSX.Element {
    const disabled = this.disabled ? 'sbb-checkbox--disabled' : '';
    const iconPlacement = this.iconPlacement === 'start' ? `sbb-checkbox__label--start` : '';

    return (
      <label class={`sbb-checkbox ${disabled}`} htmlFor={this.inputId}>
        <input
          ref={(checkbox: HTMLInputElement) => (this._checkbox = checkbox)}
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
          aria-label={this.accessibilityLabel}
          aria-labelledby={this.accessibilityLabelledby}
          aria-describedby={this.accessibilityDescribedby}
        />
        <span class="sbb-checkbox__inner">
          <span class="sbb-checkbox__selection">
            <span class="sbb-checkbox__icon">
              {(this.checked || this.indeterminate) && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={this.indeterminate ? 'M9 12H15' : 'M8 12.3304L10.4615 15L16 9'}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </span>
          </span>
          <span class={`sbb-checkbox__label ${iconPlacement}`}>
            <slot />
            <slot name="icon">
              {this.iconName && <sbb-icon name={this.iconName} />}
            </slot>
          </span>
        </span>
      </label>
    );
  }
}
