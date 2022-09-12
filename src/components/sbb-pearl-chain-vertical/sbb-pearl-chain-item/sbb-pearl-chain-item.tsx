import { Component, h, Host, Prop } from '@stencil/core';
import { PearlChainItemAttributes } from "./sbb-pearl-chain-item.custom.s";

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-item.scss',
  tag: 'sbb-pearl-chain-item',
})

export class SbbPearlChainItem {
  @Prop() public pearlChainItemAttributes: PearlChainItemAttributes;

  public render(): JSX.Element {
    const{ dotColor, dotType, lineType, lineColor, hideLine, minHeight } = this.pearlChainItemAttributes || {};


    return (
      <Host class="pearl-chain-item" style={{ display: "table-row"}}>
        <div class="pearl-chain-item" style={{ display: "table-row", height: minHeight }}>
            <div class="pearl-chain-item__row-left" style={{ display: "table-cell" }}>
              <div class="pearl-chain-item__left-slot">
                <slot name='left'></slot>
              </div>
            </div>
              <div class="pearl-chain-item__row-middle" style={{ display: "table-cell" }}>
                { !hideLine && (<div class={`pearl-chain-item__line-${lineType} ${lineColor}`}></div>)}
                <div class={`pearl-chain-item__dot-${dotType} ${dotColor}`}></div>
                <div class="pearl-chain-item__row-right" style={{ display: "table-cell" }}>
                  <div class="pearl-chain-item__right-slot">
                    <slot name='right'></slot>
                  </div>
                </div>
            </div>
          </div>
      </Host>
    );
  }
}
