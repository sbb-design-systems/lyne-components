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
import { getAccessibilityAttributeList } from '../../global/interfaces/accessibility-properties';

let nextId = 0;

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
export class SbbTag implements ComponentInterface {
  /** Id of the internal hidden checkbox element - default id will be set automatically. */
  @Prop() public tagId = `sbb-tag-${++nextId}`;

  /** Value of internal hidden checkbox. */
  @Prop() public value?: string;

  /** Whether the internal hidden checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) public checked: boolean;

  /** Active tag state */
  @Prop() public active?: boolean;

  /** Whether the internal hidden checkbox is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** Whether the internal hidden checkbox is required. */
  @Prop() public required = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon', 'amount');

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from here https://lyne.sbb.ch/tokens/icons (optional).
   */
  @Prop() public iconName?: string;

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby: string | undefined;

  @Element() private _element: HTMLElement;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  private _checkbox: HTMLInputElement;

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  /** Method triggered on checkbox change. Inverts the checked value and emits events. */
  public checkedChanged(event: Event): void {
    this.checked = this._checkbox?.checked;
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  public render(): JSX.Element {
    return (
      <label class="sbb-tag" htmlFor={this.tagId}>
        <input
          ref={(checkbox: HTMLInputElement) => (this._checkbox = checkbox)}
          type="checkbox"
          id={this.tagId}
          disabled={this.disabled}
          aria-disabled={this.disabled}
          required={this.required}
          checked={this.checked}
          aria-checked={this.checked}
          value={this.value}
          {...getAccessibilityAttributeList(this)}
          onChange={(event: Event): void => this.checkedChanged(event)}
        />
        <span class="sbb-tag__wrapper">
          {(this.iconName || this._namedSlots['icon']) && (
            <span class="sbb-tag__label--icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
          )}
          <span class="sbb-tag__text">
            <slot></slot>
          </span>
          {this._namedSlots['amount'] && (
            <span class="sbb-tag__amount">
              <slot name="amount"></slot>
            </span>
          )}
        </span>
      </label>
    );
  }
}
