import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import { InterfaceProductAttributes } from './lyne-product.custom';

/**
 * @slot icon - Slot used to render the product icon
 * @slot title - Slot used to render the title
 * @slot connection-details - Slot used to render the connection-details
 * @slot card-badge - Slot used to render the optional card badge e.g. discounts
 * @slot action - Slot used to render the link-button
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-product.default.scss',
    shared: 'styles/lyne-product.shared.scss'
  },
  tag: 'lyne-product'
})

/**
 * Generalized product version / Super Product — possible merge of ticket
 * and subscription
 */
export class LyneProduct {

  /** Lead text */
  @Prop() public lead!: string;

  /** Product ticket appearance */
  @Prop() public appearance?: InterfaceProductAttributes['appearance'] = 'primary';

  /** Detailed text */
  @Prop() public text?: string;

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasIconSlot: boolean;
  private _hasTitleSlot: boolean;
  private _hasConnectionDetailsSlot: boolean;
  private _hasCardBadgeSlot: boolean;
  private _hasActionSlot: boolean;

  public componentWillLoad(): void {
    this._hasIconSlot = Boolean(this._hostElement.querySelector('[slot="icon"]'));
    this._hasTitleSlot = Boolean(this._hostElement.querySelector('[slot="title"]'));
    this._hasConnectionDetailsSlot = Boolean(this._hostElement.querySelector('[slot="connection-details"]'));
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
      cardSizeClass = ' product--tall';
    }

    return (
      <div
        class={
          `product product--${this.appearance}
          ${cardSizeClass}`
        }
      >
        <div class='product__content'>
          {this._hasIconSlot
            ? <div class='product__icon'><slot name='icon'/></div>
            : ''
          }
          <div>
            {this._hasTitleSlot
              ? <div class='product__title'><slot name='title'/></div>
              : ''
            }
            <div class='product__lead'>
              {this.lead}
            </div>
            {this.text
              ? <div class='product__text'>{this.text}</div>
              : ''
            }
            {this._hasConnectionDetailsSlot
              ? <div class='product__connection-details'><slot name='connection-details'/></div>
              : ''
            }
          </div>
        </div>
        {this._hasCardBadgeSlot
          ? <div class='product__card-badge'><slot name='card-badge'/></div>
          : ''
        }
        {this._hasActionSlot
          ? <div class='product__action'><slot name='action'/></div>
          : ''
        }
      </div>
    );
  }
}
