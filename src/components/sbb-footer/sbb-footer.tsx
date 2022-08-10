import { Component, Element, h, Host, Prop } from '@stencil/core';
import { InterfaceFooterAttributes } from './sbb-footer.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-footer.scss',
  tag: 'sbb-footer',
})
export class SbbFooter {
  /** Footer appearance */
  @Prop() public appearance?: InterfaceFooterAttributes['appearance'] = 'primary';

  /** Footer title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle!: string;

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  private _hasCol1Slot: boolean;
  private _hasCol2Slot: boolean;
  private _hasCol3Slot: boolean;
  private _hasCol4Slot: boolean;
  private _hasClockSlot: boolean;
  private _hasBottomSlot: boolean;

  public componentWillLoad(): void {
    // Check slots
    this._hasCol1Slot = Boolean(this._hostElement.querySelector('[slot="col-1"]'));
    this._hasCol2Slot = Boolean(this._hostElement.querySelector('[slot="col-2"]'));
    this._hasCol3Slot = Boolean(this._hostElement.querySelector('[slot="col-3"]'));
    this._hasCol4Slot = Boolean(this._hostElement.querySelector('[slot="col-4"]'));
    this._hasClockSlot = Boolean(this._hostElement.querySelector('[slot="clock"]'));
    this._hasBottomSlot = Boolean(this._hostElement.querySelector('[slot="bottom"]'));
  }

  public render(): JSX.Element {
    const className = `footer footer--${this.appearance}`;

    const attrs = {
      class: className,
    };

    return (
      <Host>
        <footer role="contentinfo" {...attrs}>
          <sbb-title level="1" visually-hidden="true">
            <span slot="title">{this.accessibilityTitle}</span>
          </sbb-title>
          {this._hasCol1Slot ||
          this._hasCol2Slot ||
          this._hasCol3Slot ||
          this._hasCol4Slot ||
          this._hasClockSlot ? (
            <div class="columns">
              <slot name="col-1" />
              <slot name="col-2" />
              <slot name="col-3" />
              <slot name="col-4" />
              <slot name="clock" />
            </div>
          ) : (
            ''
          )}
          {this._hasBottomSlot ? (
            <div class="bottom">
              <slot name="bottom" />
            </div>
          ) : (
            ''
          )}
        </footer>
      </Host>
    );
  }
}
