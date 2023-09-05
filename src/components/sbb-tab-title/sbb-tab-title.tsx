import { Component, h, JSX, Prop, State, Element } from '@stencil/core';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot unnamed - This slot will show the provided tab title.
 * @slot icon - Use this slot to display an icon to the left of the title, by providing the `sbb-icon` component.
 * @slot amount - Provide a number to show an amount to the right of the title.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-tab-title.scss',
  tag: 'sbb-tab-title',
})
export class SbbTabTitle {
  /**
   * The level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @Prop() public level?: InterfaceTitleAttributes['level'] = '1';

  /** Active tab state */
  @Prop({ reflect: true }) public active?: boolean;

  /** Disabled tab state */
  @Prop({ reflect: true }) public disabled?: boolean;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Prop() public iconName?: string;

  /** Amount displayed inside the tab. */
  @Prop() public amount?: string;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon', 'amount');

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const TAGNAME = `h${Number(this.level) < 7 ? this.level : '1'}`;

    return (
      <TAGNAME class="sbb-tab-title">
        {(this.iconName || this._namedSlots['icon']) && (
          <span class="sbb-tab-title__icon">
            <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
          </span>
        )}
        <span class="sbb-tab-title__text">
          <slot></slot>
        </span>
        {(this.amount || this._namedSlots['amount']) && (
          <span class="sbb-tab-title__amount">
            <slot name="amount">{this.amount}</slot>
          </span>
        )}
      </TAGNAME>
    );
  }
}
