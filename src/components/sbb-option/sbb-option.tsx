import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { assignId } from '../../global/helpers/assign-id';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';

let nextId = 0;

/**
 * @slot unnamed - Use this to provide the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, an sbb-icon will be used.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-option.scss',
  tag: 'sbb-option',
})
export class SbbOption implements ComponentInterface {
  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;
  
  /**
   * Wheter the icon space is preserved when no icon is set
  */
  @Prop({ reflect: true }) public preserveIconSpace = true;

  @Prop() public selected?: boolean;

  @Prop() public active?: boolean;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @Element() private _element: HTMLElement;

  private _optionId = `sbb-option-${++nextId}`;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  public render(): JSX.Element {
    return (
      <Host role="option" aria-selected={this.selected} ref={assignId(() => this._optionId)}>
        <div class="sbb-option">
          <span
            class={{
              'sbb-option__icon': true,
              //TODO check if needed to change to data-*
              'sbb-option__icon--hidden':
                !this.preserveIconSpace && !this._namedSlots.icon && !this.iconName,
            }}
          >
            <slot name="icon">
              {this.iconName && <sbb-icon slot="icon" name={this.iconName} />}
            </slot>
          </span>
          <span>
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}
