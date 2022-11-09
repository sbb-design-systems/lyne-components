import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';
import { forwardHostEvent } from '../../global/interfaces/link-button-properties';
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
  @Prop({ reflect: true }) public labelSize?: InterfaceSbbRadioButton['labelSize'] = 'm';

  private _radioButton: InterfaceSbbRadioButton;
  private _radioButtonLabelId = `sbb-radio-button-label-${++nextId}`;

  @Element() private _element!: HTMLElement;

  @Listen('click')
  public handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      forwardHostEvent(event, this._element, this._radioButton);
    }
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
            ref={(radioBtn) => (this._radioButton = radioBtn as InterfaceSbbRadioButton)}
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
