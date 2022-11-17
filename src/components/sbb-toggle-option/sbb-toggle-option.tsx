import { Component, Event, EventEmitter, h, Host, JSX, Listen, Method, Prop } from '@stencil/core';

let nextId = 0;

/**
 * @slot unnamed - Slot used to render the content inside the component.
 * @slot icon - Slot used to render the `<sbb-icon>`.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-option.scss',
  tag: 'sbb-toggle-option',
})
export class SbbToggleOption {
  /**
   * Id of the internal input element - default id will be set automatically.
   */
  @Prop() public toggleOptionId = `sbb-toggle-option-${++nextId}`;

  /**
   * Name of the toggle-option.
   */
  @Prop({ reflect: true }) public name?: string;

  /**
   * Value of toggle-option.
   */
  @Prop({ reflect: true }) public value?: string;

  /**
   * Name of the icon for `<sbb-icon>`.
   */
  @Prop() public iconName?: string;

  /**
   * Whether the toggle option is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the toggle-option is required.
   */
  @Prop({ reflect: true }) public required = false;

  /**
   * Whether the toggle-option is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Emits whenever the toggle-option value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-toggle-option_did-select',
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

    if (!this.checked) {
      this.checked = true;
    }

    this.didSelect.emit(this.value);
  }

  public render(): JSX.Element {
    return (
      <Host
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-checked={`${this.checked}`}
      >
        <input
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          name={this.name}
          id={this.toggleOptionId}
          disabled={this.disabled}
          required={this.required}
          checked={this.checked}
          value={this.value}
        />
        <span>
          {!this.iconName && <slot />}
          {this.iconName && (
            <slot name="icon">
              <sbb-icon name={this.iconName}></sbb-icon>
            </slot>
          )}
        </span>
      </Host>
    );
  }
}
