import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { forwardEventToHost } from '../../global/helpers/forward-event';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import {
  AccessibilityProperties,
  getAccessibilityAttributeList,
} from '../../global/interfaces/accessibility-properties';
import { forwardHostEvent } from '../../global/interfaces/link-button-properties';
import { focusInputElement } from '../../global/helpers/input-element';

/**
 * @slot unnamed - This slot will show the provided tag label.
 * @slot icon - Use this slot to display an icon at the component start, by providing a `sbb-icon` component.
 * @slot amount - Provide an amount to show it at the component end.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tag.scss',
  tag: 'sbb-tag',
})
export class SbbTag implements ComponentInterface, AccessibilityProperties {
  /** Value of internal hidden checkbox. */
  @Prop() public value?: string;

  /** Amount displayed inside the tag. */
  @Prop() public amount?: string;

  /** Whether the internal hidden checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) public checked: boolean;

  /** Whether the internal hidden checkbox is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon', 'amount');

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from here https://lyne.sbb.ch/tokens/icons (optional).
   */
  @Prop() public iconName?: string;

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  @Element() private _element: HTMLElement;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('click')
  public handleClick(event: Event): void {
    forwardHostEvent(event, this._element, this._checkbox);
  }

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  private _checkbox: HTMLInputElement;

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    // Forward focus call to input element
    this._element.focus = focusInputElement;
  }

  /** Method triggered on checkbox change. Inverts the checked value and emits events. */
  public checkedChanged(event: Event): void {
    this.checked = this._checkbox?.checked;
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  public render(): JSX.Element {
    return (
      <label class="sbb-tag__wrapper">
        <input
          ref={(checkbox: HTMLInputElement) => (this._checkbox = checkbox)}
          type="checkbox"
          disabled={this.disabled}
          aria-disabled={this.disabled}
          checked={this.checked}
          aria-checked={this.checked}
          value={this.value}
          {...getAccessibilityAttributeList(this)}
          onChange={(event: Event): void => this.checkedChanged(event)}
        />
        <span class="sbb-tag">
          {(this.iconName || this._namedSlots['icon']) && (
            <span class="sbb-tag__icon sbb-tag--shift">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
          )}
          <span class="sbb-tag__text sbb-tag--shift">
            <slot></slot>
          </span>
          {(this.amount || this._namedSlots['amount']) && (
            <span class="sbb-tag__amount sbb-tag--shift">
              <slot name="amount">{this.amount}</slot>
            </span>
          )}
        </span>
      </label>
    );
  }
}
