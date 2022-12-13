import {
  Component,
  ComponentInterface,
  Element,
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
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';

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
  @Prop() public disabled = false;

  /**
   * Name of the icon for `<sbb-icon>`.
   */
  @Prop() public iconName?: string;

  /**
   * Value of toggle-option.
   */
  @Prop() public value?: string;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('label');

  /**
   * Emits whenever the toggle-option value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-select',
  })
  public didSelect: EventEmitter<any>;

  private _hasLabel = false;

  @Element() private _element!: HTMLElement;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleNamedSlotChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

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

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._hasLabel = this._namedSlots['label'];
  }

  public render(): JSX.Element {
    return (
      <Host
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled}
        /* eslint-enable jsx-a11y/aria-proptypes */
        aria-labelledby={this.toggleOptionId}
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
        <span class="sbb-toggle-option">
          {this.iconName && (
            <slot name="icon">
              <sbb-icon name={this.iconName}></sbb-icon>
            </slot>
          )}
          {this._hasLabel && (
            <label id={this.toggleOptionId} htmlFor={this.toggleOptionId}>
              <slot name="label" />
            </label>
          )}
        </span>
      </Host>
    );
  }
}
