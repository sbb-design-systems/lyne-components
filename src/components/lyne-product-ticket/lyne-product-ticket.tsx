import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import { InterfaceProductTicketAttributes } from './lyne-product-ticket.custom';

/**
 * @slot icon - Slot used to render the product icon
 * @slot title - Slot used to render the title
 * @slot details - Slot used to render the details
 * @slot card-badge - Slot used to render the optional card badge e.g. discounts
 * @slot action - Slot used to render the link-button
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-product-ticket.default.scss',
    shared: 'styles/lyne-product-ticket.shared.scss'
  },
  tag: 'lyne-product-ticket'
})

export class LyneProductTicket {

  /** Product ticket appearance */
  @Prop() public appearance?: InterfaceProductTicketAttributes['appearance'] = 'primary';

  /** Detailed text */
  @Prop() public text?: string;

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasIconSlot: boolean;
  private _hasTitleSlot: boolean;
  private _hasDetailsSlot: boolean;
  private _hasCardBadgeSlot: boolean;
  private _hasActionSlot: boolean;

  public componentWillLoad(): void {
    this._hasIconSlot = Boolean(this._hostElement.querySelector('[slot="icon"]'));
    this._hasTitleSlot = Boolean(this._hostElement.querySelector('[slot="title"]'));
    this._hasDetailsSlot = Boolean(this._hostElement.querySelector('[slot="details"]'));
    this._hasCardBadgeSlot = Boolean(this._hostElement.querySelector('[slot="card-badge"]'));
    this._hasActionSlot = Boolean(this._hostElement.querySelector('[slot="action"]'));
  }

  public render(): JSX.Element {

    /**
     * Add additional CSS classes
     * ----------------------------------------------------------------
     */
    let cardSizeClass = '';

    if (this._hasCardBadgeSlot) {
      cardSizeClass = ' product-ticket--tall';
    }

    return (
      <div
        class={
          `product-ticket product-ticket--${this.appearance}
          ${cardSizeClass}`
        }
      >
        <div class='product-ticket__content'>
          {this._hasIconSlot
            ? <div class='product-ticket__icon'><slot name='icon'/></div>
            : ''
          }
          <div>
            {this._hasTitleSlot
              ? <div class='product-ticket__title'><slot name='title'/></div>
              : ''
            }
            {this.text
              ? <div class='product-ticket__text'>{this.text}</div>
              : ''
            }
            {this._hasDetailsSlot
              ? <div class='product-ticket__details'><slot name='details'/></div>
              : ''
            }
          </div>
        </div>
        {this._hasCardBadgeSlot
          ? <div class='product-ticket__card-badge'><slot name='card-badge'/></div>
          : ''
        }
        {this._hasActionSlot
          ? <div class='product-ticket__action'><slot name='action'/></div>
          : ''
        }
      </div>
    );
  }
}
