import { Component, h, Host, Prop } from '@stencil/core';
import { PearlChainItemAttributes } from './sbb-pearl-chain-item.custom.d';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-item.scss',
  tag: 'sbb-pearl-chain-item',
})
export class SbbPearlChainItem {
  @Prop() public pearlChainItemAttributes: PearlChainItemAttributes;

  @Prop() public disableAnimation?: boolean;

  public render(): JSX.Element {
    const { dotColor, dotType, lineType, lineColor, hideLine, minHeight, dotSize, position } =
      this.pearlChainItemAttributes || {};

    const dotColorClass =
      position > 0 && position <= 100 ? 'sbb-color__gray' : `sbb-color__${dotColor}`;
    const animation = this.disableAnimation ? 'position__dot--disable-animation' : '';

    return (
      <Host class="sbb-pearl-chain-item" style={{ display: 'table-row' }}>
        <div
          class="sbb-pearl-chain-item__row--left"
          style={{ display: 'table-cell', height: minHeight + 'px' }}
        >
          <div class="sbb-pearl-chain-item__left-slot">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="sbb-pearl-chain-item__row--middle" style={{ display: 'table-cell' }}>
          {!hideLine && (
            <div
              style={{ '--leg-status': `${position}%` }}
              class={`sbb-pearl-chain-item__line sbb-pearl-chain-item__line--${lineType} sbb-color__${lineColor}`}
            ></div>
          )}
          {dotType !== 'double-bullet' ? (
            <div
              class={`sbb-pearl-chain-item__dot--${dotType} ${dotColorClass} sbb-pearl-chain-item__dot-size--${dotSize}`}
            />
          ) : (
            <div
              class={`sbb-pearl-chain-item__dot--thin-bullet sbb-color__${dotColor} sbb-pearl-chain-item__dot-size--ultra`}
            >
              <div
                class={`sbb-pearl-chain-item__dot--thin-bullet sbb-color__${dotColor} sbb-pearl-chain-item__dot-size--extra-small`}
              />
            </div>
          )}
          {position > 0 && (
            <div style={{ top: `calc(${position}%` }} class={`position__dot ${animation}`}></div>
          )}
        </div>
        <div class="sbb-pearl-chain-item__row--right" style={{ display: 'table-cell' }}>
          <slot name="right"></slot>
        </div>
      </Host>
    );
  }
}
