import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import { InterfaceProductAttributes } from './lyne-product.custom';

/**
 * @slot icon - Slot used to render the product icon
 * @slot category - Slot used to render the product category
 * @slot title - Slot used to render the title
 * @slot lead - Slot used to render the lead text
 * @slot text - Slot used to render product contents — only inline HTML
 * elements are allowed
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
 * Generalized product version / Super Product — merge of ticket
 * and subscription
 */
export class LyneProduct {

  /** Product ticket appearance */
  @Prop() public appearance?: InterfaceProductAttributes['appearance'] = 'primary';

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasIconSlot: boolean;
  private _hasCategorySlot: boolean;
  private _hasTitleSlot: boolean;
  private _hasLeadSlot: boolean;
  private _hasTextSlot: boolean;
  private _hasConnectionDetailsSlot: boolean;
  private _hasCardBadgeSlot: boolean;
  private _hasActionSlot: boolean;

  public componentWillLoad(): void {
    this._hasIconSlot = Boolean(this._hostElement.querySelector('[slot="icon"]'));
    this._hasCategorySlot = Boolean(this._hostElement.querySelector('[slot="category"]'));
    this._hasTitleSlot = Boolean(this._hostElement.querySelector('[slot="title"]'));
    this._hasLeadSlot = Boolean(this._hostElement.querySelector('[slot="lead"]'));
    this._hasTextSlot = Boolean(this._hostElement.querySelector('[slot="text"]'));
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
            ? <span class='product__icon'><slot name='icon'/></span>
            : ''
          }
          <div>
            {this._hasCategorySlot
              ? <div class='product__category'><slot name='category'/></div>
              : ''
            }
            {this._hasTitleSlot
              ? <div class='product__title'><slot name='title'/></div>
              : ''
            }
            {this._hasLeadSlot
              ? <div class='product__lead'><slot name='lead'/></div>
              : ''
            }
            {this._hasTextSlot
              ? <p class='product__text'><slot name='text'/></p>
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
