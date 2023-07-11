import {
  Component,
  ComponentInterface,
  Event,
  Element,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { ToggleOptionStateChange } from './sbb-toggle-option.custom';

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
   * Whether the toggle-option is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Whether the toggle option is disabled.
   */
  @Prop({ mutable: true, reflect: true }) public disabled = false;

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
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('icon');

  @Element() private _element!: HTMLElement;

  private _toggle?: HTMLSbbToggleElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Internal event that emits whenever the state of the toggle option
   * in relation to the parent toggle changes.
   */
  @Event({
    bubbles: true,
    eventName: 'state-change',
  })
  public stateChange: EventEmitter<ToggleOptionStateChange>;

  @Watch('checked')
  public handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.stateChange.emit({ type: 'checked', checked: currentValue });
      this._verifyTabindex();
    }
  }

  @Watch('value')
  public handleValueChange(currentValue: string, previousValue: string): void {
    if (this.checked && currentValue !== previousValue) {
      this.stateChange.emit({ type: 'value', value: currentValue });
    }
  }

  @Watch('disabled')
  public handleDisabledChange(currentValue: boolean): void {
    // Enforce disabled state from parent.
    if (!this._toggle) {
      // Ignore illegal state. Our expectation  is that a sbb-toggle-option
      // always has a parent sbb-toggle.
    } else if (this._toggle.disabled && !currentValue) {
      this.disabled = true;
    } else if (!this._toggle.disabled && currentValue) {
      this.disabled = false;
    }
    this._verifyTabindex();
  }

  @Listen('click')
  public handleClick(): void {
    if (this.checked || this.disabled) {
      return;
    }

    this.checked = true;
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    // We can use closest here, as we expect the parent sbb-toggle to be in light DOM.
    this._toggle = this._element.closest('sbb-toggle');
    this._verifyTabindex();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _verifyTabindex(): void {
    this._element.tabIndex = this.checked && !this.disabled ? 0 : -1;
  }

  public render(): JSX.Element {
    return (
      <Host
        // The `aria-checked` attribute needs a string value to be correctly read by screen-readers
        aria-checked={this.checked.toString()}
        aria-disabled={this.disabled}
        role="radio"
        data-icon-only={!this._hasLabel && !!(this.iconName || this._namedSlots.icon)}
      >
        <input
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          id="sbb-toggle-option-id"
          disabled={this.disabled}
          checked={this.checked}
          value={this.value}
          onClick={(event) => event.stopPropagation()}
        />
        <label class="sbb-toggle-option" htmlFor="sbb-toggle-option-id">
          {(this.iconName || this._namedSlots.icon) && (
            <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
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
