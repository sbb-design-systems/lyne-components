import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core';

let nextId = 0;

/**
 * @slot unnamed - Slot used to render the label of the toggle option.
 * @slot icon - Slot used to render the `<sbb-icon>`.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-option.scss',
  tag: 'sbb-toggle-option',
})
export class SbbToggleOption implements ComponentInterface {
  /**
   * Id of the internal input element - default id will be set automatically.
   */
  @Prop() public toggleOptionId = `sbb-toggle-option-${++nextId}`;

  /**
   * Whether the toggle-option is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Whether the toggle option is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Name of the icon for `<sbb-icon>`.
   */
  @Prop() public iconName?: string;

  /**
   * Value of toggle-option.
   */
  @Prop() public value?: string;

  /**
   * Whether the toggle option has a label.
   */
  @State() private _hasLabel = false;

  /**
   * Emits whenever the toggle-option value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-select',
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
        aria-disabled={this.disabled}
        role="radio"
      >
        <input
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          id={this.toggleOptionId}
          disabled={this.disabled}
          checked={this.checked}
          value={this.value}
        />
        <label
          class={{
            'sbb-toggle-option': true,
            'sbb-toggle-option--icon-only': !this._hasLabel && !!this.iconName,
          }}
          htmlFor={this.toggleOptionId}
        >
          {this.iconName && (
            <slot name="icon">
              <sbb-icon name={this.iconName}></sbb-icon>
            </slot>
          )}
          <span class="sbb-toggle-option__label">
            <slot
              onSlotchange={(event) =>
                (this._hasLabel = (event.target as HTMLSlotElement).assignedNodes().length > 0)
              }
            />
          </span>
        </label>
      </Host>
    );
  }
}
