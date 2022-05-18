import {
  Component,
  Element,
  h,
  Host,
  Prop
} from '@stencil/core';
import { InterfaceGridAttributes } from './lyne-grid.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-grid.default.scss',
    shared: 'styles/lyne-grid.shared.scss'
  },
  tag: 'lyne-grid'
})

export class LyneGrid {

  /** Section appearance */
  @Prop() public appearance?: InterfaceGridAttributes['appearance'] = 'primary';

  /** Grid variant */
  @Prop() public variant?: InterfaceGridAttributes['variant'] = 'base';

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _topProductSubscription1: boolean;
  private _topProductSubscription2: boolean;
  private _topProduct1: boolean;
  private _topProduct2: boolean;
  private _topProduct3: boolean;
  private _topProduct4: boolean;
  private _eightColumnsCentered: boolean;

  public componentWillLoad(): void {
    // Check slots
    this._topProductSubscription1 = Boolean(this._hostElement.querySelector('[slot="top-product-subscription-1"]'));
    this._topProductSubscription2 = Boolean(this._hostElement.querySelector('[slot="top-product-subscription-2"]'));
    this._topProduct1 = Boolean(this._hostElement.querySelector('[slot="top-product-1"]'));
    this._topProduct2 = Boolean(this._hostElement.querySelector('[slot="top-product-2"]'));
    this._topProduct3 = Boolean(this._hostElement.querySelector('[slot="top-product-3"]'));
    this._topProduct4 = Boolean(this._hostElement.querySelector('[slot="top-product-4"]'));
    this._eightColumnsCentered = Boolean(this._hostElement.querySelector('[slot="eight-columns-centered"]'));
  }

  public render(): JSX.Element {

    const className = `grid grid--${this.appearance} grid--${this.variant}`;

    const attrs = {
      class: className
    };

    return (
      <Host>
        <div {...attrs}
        >
          {this._topProduct1
            ? <slot name='top-product-1' />
            : ''
          }
          {this._topProduct2
            ? <slot name='top-product-2' />
            : ''
          }
          {this._topProduct3
            ? <slot name='top-product-3' />
            : ''
          }
          {this._topProduct4
            ? <slot name='top-product-4' />
            : ''
          }
          {this._topProductSubscription1
            ? <slot name='top-product-subscription-1' />
            : ''
          }
          {this._topProductSubscription2
            ? <slot name='top-product-subscription-2' />
            : ''
          }
          {this._eightColumnsCentered
            ? <slot name='eight-columns-centered' />
            : ''
          }
        </div>
      </Host>
    );
  }
}
