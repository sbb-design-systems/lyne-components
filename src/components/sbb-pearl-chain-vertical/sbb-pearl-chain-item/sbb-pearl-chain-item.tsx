import { Component, h, Host, Prop, Element, State } from '@stencil/core';
import { PearlChainItemAttributes } from './sbb-pearl-chain-item.custom.d';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-item.scss',
  tag: 'sbb-pearl-chain-item',
})
export class SbbPearlChainItem {
  @Prop() public pearlChainItemAttributes: PearlChainItemAttributes;

  @Prop() public disableAnimation?: boolean;

  @Element() private _element: HTMLElement;

  @State() private _lineHeight = 0;

  public componentDidLoad(): void {
    this._lineHeight = this._element.shadowRoot.getElementById('line-height').clientHeight;
  }

  public render(): JSX.Element {
    const { dotColor, dotType, lineType, lineColor, hideLine, minHeight, dotSize, position } =
      this.pearlChainItemAttributes || {};

    const currentPos = (position * this._lineHeight / 100) - 10;

    const animation = this.disableAnimation ? 'position__dot--disable-animation' : '';

    return (
      <Host class="sbb-pearl-chain-item">
        <div class="sbb-pearl-chain-item" style={{ display: 'table-row' }}>
          <div
            class="sbb-pearl-chain-item__row-left"
            style={{ display: 'table-cell', height: minHeight + "px" }}
          >
            <div class="sbb-pearl-chain-item__left-slot">
              <slot name="left"></slot>
            </div>
          </div>
          <div id='line-height' class="sbb-pearl-chain-item__row-middle" style={{ display: 'table-cell' }}>
            {!hideLine && (
              <div class={`sbb-pearl-chain-item__line-${lineType} sbb-color__${lineColor}`}></div>
            )}
            {dotType !== 'double-bullet' ?
              <div class={`sbb-pearl-chain-item__dot-${dotType} sbb-color__${dotColor} sbb-pearl-chain-item__dot-size-${dotSize}`} />
              :
              <div class={`sbb-pearl-chain-item__dot-thin-bullet sbb-color__${dotColor} sbb-pearl-chain-item__dot-size-ultra`}>
                <div class={`sbb-pearl-chain-item__dot-thin-bullet sbb-color__${dotColor} sbb-pearl-chain-item__dot-size-extra-small`} />
              </div>
            }
            {currentPos > 0 && (
              <div style={{ transform: `translateY(${currentPos}px)` }} class={`position__dot ${animation}`}></div>
            )}
          </div>
          <div class="sbb-pearl-chain-item__row-right" style={{ display: 'table-cell' }}>
            <slot name="right"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
