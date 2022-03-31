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

  private _hasFullWidthSlot: boolean;
  private _hasHalfWidthFirstSlot: boolean;
  private _hasHalfWidthSecondSlot: boolean;

  public componentWillLoad(): void {
    // Check slots
    this._hasFullWidthSlot = Boolean(this._hostElement.querySelector('[slot="span-full-width"]'));
    this._hasHalfWidthFirstSlot = Boolean(this._hostElement.querySelector('[slot="span-half-width--1st"]'));
    this._hasHalfWidthSecondSlot = Boolean(this._hostElement.querySelector('[slot="span-half-width--2nd"]'));
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
          {this._hasFullWidthSlot
            ? <div class='span-full-width'><slot name='span-full-width' /></div>
            : ''
          }
          {this._hasHalfWidthFirstSlot
            ? <div class='span-half-width--1st'><slot name='span-half-width--1st' /></div>
            : ''
          }
          {this._hasHalfWidthSecondSlot
            ? <div class='span-half-width--2nd'><slot name='span-half-width--2nd' /></div>
            : ''
          }
        </div>
      </Host>
    );
  }
}
