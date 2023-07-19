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
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { ButtonProperties, resolveButtonRenderVariables } from '../../global/interfaces';
import { TagStateChange } from './sbb-tag.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  actionElementHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';

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
export class SbbTag implements ComponentInterface, ButtonProperties {
  /** The name attribute to use for the button. */
  @Prop({ reflect: true }) public name: string | undefined;

  /** Value of the tag. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

  /** Amount displayed inside the tag. */
  @Prop() public amount?: string;

  /** Whether the toggle is checked. */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /** Whether the tag is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon', 'amount');

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from https://icons.app.sbb.ch (optional).
   */
  @Prop() public iconName?: string;

  @Element() private _element!: HTMLElement;

  @Watch('checked')
  public handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.stateChange.emit({ type: 'checked', checked: currentValue });
    }
  }

  @Watch('value')
  public handleValueChange(currentValue: string, previousValue: string): void {
    if (this.checked && currentValue !== previousValue) {
      this.stateChange.emit({ type: 'value', value: currentValue });
    }
  }

  /**
   * Internal event that emits whenever the state of the tag
   * in relation to the parent toggle changes.
   */
  @Event({
    bubbles: true,
    eventName: 'state-change',
  })
  public stateChange: EventEmitter<TagStateChange>;

  /** Input event emitter */
  @Event({ bubbles: true, composed: true }) public input: EventEmitter;

  /** @deprecated only used for React. Will probably be removed once React 19 is available. */
  @Event({ bubbles: true }) public didChange: EventEmitter;

  /** Change event emitter */
  @Event({ bubbles: true }) public change: EventEmitter;

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  /** Method triggered on button click. Inverts the checked value and emits events. */
  @Listen('click')
  public handleClick(): void {
    if (this.disabled) {
      return;
    }

    const tagGroup = this._element.closest('sbb-tag-group') as HTMLSbbTagGroupElement;

    // Prevent deactivating on exclusive / radio mode
    if (tagGroup && !tagGroup.multiple && this.checked) {
      return;
    }
    this.checked = !this.checked;
    this.input.emit();
    this.change.emit();
    this.didChange.emit();
  }

  public render(): JSX.Element {
    const { hostAttributes } = resolveButtonRenderVariables(this);
    // We have to ensure that the value is always present
    hostAttributes['aria-pressed'] = this.checked.toString();

    return (
      <Host {...hostAttributes}>
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
      </Host>
    );
  }
}
