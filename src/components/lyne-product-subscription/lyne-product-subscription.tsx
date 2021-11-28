import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';

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
    default: 'styles/lyne-product-subscription.default.scss',
    shared: 'styles/lyne-product-subscription.shared.scss'
  },
  tag: 'lyne-product-subscription'
})

export class LyneProductSubscription {

  /** Lead text */
  @Prop() public lead!: string;

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
    return (
      <div
        class={
          'product-subscription'
        }
        itemscope itemtype='https://schema.org/Product'
      >
        <div class='product-subscription__content'>
          {this._hasIconSlot
            ? <div class='product-subscription__icon'><slot name='icon'/></div>
            : ''
          }
          <div>
            {this._hasTitleSlot
              ? <div class='product-subscription__title'><slot name='title'/></div>
              : ''
            }
            <div class='product-subscription__lead'>
              {this.lead}
            </div>
            {this.text
              ? <div class='product-subscription__text'>{this.text}</div>
              : ''
            }
            {this._hasConnectionDetailsSlot
              ? <div class='product-subscription__connection-details'><slot name='connection-details'/></div>
              : ''
            }
          </div>
        </div>
        {this._hasCardBadgeSlot
          ? <div class='product-subscription__salesprice'><slot name='card-badge'/></div>
          : ''
        }
        {this._hasActionSlot
          ? <div class='product-subscription__action'><slot name='action'/></div>
          : ''
        }
      </div>
    );
  }
}
