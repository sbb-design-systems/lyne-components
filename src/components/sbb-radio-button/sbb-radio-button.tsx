import { Component, Event, EventEmitter, h, Host, JSX, Listen, Method, Prop } from '@stencil/core';
import { InterfaceSbbRadioButton } from './sbb-radio-button.custom';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to provide the radio label.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-radio-button.scss',
  tag: 'sbb-radio-button',
})
export class SbbRadioButton {
  /**
   * Id of the internal input element - default id will be set automatically.
   */
  @Prop() public radioButtonId = `sbb-radio-button-${++nextId}`;

  /**
   * Name of the radio button.
   */
  @Prop({ reflect: true }) public name?: string;

  /**
   * Whether the radio can be deselected.
   */
  @Prop() public allowEmptySelection = false;

  /**
   * Value of radio button.
   */
  @Prop({ reflect: true }) public value?: string;

  /**
   * Whether the radio button is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the radio button is required.
   */
  @Prop({ reflect: true }) public required = false;

  /**
   * Whether the radio button is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Label size variant, either m or s.
   */
  @Prop({ reflect: true }) public size?: InterfaceSbbRadioButton['size'] = 'm';

  // private _radioButton: InterfaceSbbRadioButton;
  private _radioButtonLabelId = `sbb-radio-button-label-${++nextId}`;

  /**
   * Emits whenever the radio group value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-radio-button_did-select',
  })
  public didSelect: EventEmitter<any>;

  @Listen('click')
  public handleClick(event: Event): void {
    this.select();
    event.preventDefault();
  }

  @Method()
  public async select(): Promise<void> {
    if (this.disabled) {
      return;
    }

    let value = this.value;

    if (this.allowEmptySelection) {
      this.checked = !this.checked;
      value = this.checked ? value : undefined;
    } else if (!this.checked) {
      this.checked = true;
    }

    this.didSelect.emit(value);
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    evt.code === 'Space' && this.select();
  }

  public render(): JSX.Element {
    return (
      <Host
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-checked={`${this.checked}`}
        aria-labelledby={this._radioButtonLabelId}
        role="radio"
      >
        <label id={this._radioButtonLabelId} htmlFor={this.radioButtonId}>
          <input
            type="radio"
            aria-hidden="true"
            tabindex="-1"
            name={this.name}
            id={this.radioButtonId}
            disabled={this.disabled}
            required={this.required}
            checked={this.checked}
            value={this.value}
          />
          <span>
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}
