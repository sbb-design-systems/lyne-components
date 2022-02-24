import {
  Component,
  Element,
  h,
  Host,
  Prop
} from '@stencil/core';
import { InterfaceSectionAttributes } from './lyne-section.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-section.default.scss',
    shared: 'styles/lyne-section.shared.scss'
  },
  tag: 'lyne-section'
})

export class LyneSection {

  /** Section appearance */
  @Prop() public appearance?: InterfaceSectionAttributes['appearance'] = 'primary';

  /** Section title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle!: string;

  /** Section width */
  @Prop() public width?: InterfaceSectionAttributes['width'] = 'full-bleed--forever';

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasFullWidthSlot: boolean;
  private _hasCol1Slot: boolean;
  private _hasCol2Slot: boolean;
  private _hasCol3Slot: boolean;
  private _hasCol4Slot: boolean;

  public componentWillLoad(): void {
    // Check slots
    this._hasFullWidthSlot = Boolean(this._hostElement.querySelector('[slot="full-width"]'));
    this._hasCol1Slot = Boolean(this._hostElement.querySelector('[slot="col-1"]'));
    this._hasCol2Slot = Boolean(this._hostElement.querySelector('[slot="col-2"]'));
    this._hasCol3Slot = Boolean(this._hostElement.querySelector('[slot="col-3"]'));
    this._hasCol4Slot = Boolean(this._hostElement.querySelector('[slot="col-4"]'));
  }

  public render(): JSX.Element {

    const className = `section section--${this.appearance} section--${this.width}`;

    const attrs = {
      class: className
    };

    return (
      <Host>
        <section {...attrs}
        >
          <lyne-title level='1' visually-hidden='true' text={this.accessibilityTitle} />
          {this._hasCol1Slot || this._hasCol2Slot || this._hasCol3Slot || this._hasCol4Slot
            ? <div class='columns'><slot name='col-1'/><slot name='col-2'/><slot name='col-3'/><slot name='col-4'/><slot name='clock'/></div>
            : ''
          }
          {this._hasFullWidthSlot
            ? <div class='full-width'><slot name='full-width' /></div>
            : ''
          }
        </section>
      </Host>
    );
  }
}
