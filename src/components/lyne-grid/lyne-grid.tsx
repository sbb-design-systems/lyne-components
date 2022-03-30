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

  /** Section width */
  @Prop() public width?: InterfaceGridAttributes['width'] = 'full-bleed--forever';

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasFullWidthSlot: boolean;

  public componentWillLoad(): void {
    // Check slots
    this._hasFullWidthSlot = Boolean(this._hostElement.querySelector('[slot="full-width"]'));
  }

  public render(): JSX.Element {

    const className = `section section--${this.appearance} section--${this.width}`;

    const attrs = {
      class: className
    };

    return (
      <Host>
        <div {...attrs}
        >
          {this._hasFullWidthSlot
            ? <div class='full-width'><slot name='full-width' /></div>
            : ''
          }
        </div>
      </Host>
    );
  }
}
