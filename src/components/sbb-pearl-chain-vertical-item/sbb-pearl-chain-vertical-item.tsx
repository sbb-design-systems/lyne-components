import { Component, h, Host, Prop } from '@stencil/core';
import { PearlChainVerticalItemAttributes } from './sbb-pearl-chain-vertical-item.custom';

/**
 * @slot left - content of the left side of the item
 * @slot right - content of the right side of the item
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-vertical-item.scss',
  tag: 'sbb-pearl-chain-vertical-item',
})
export class SbbPearlChainVerticalItem {
  /** The pearlChainVerticalItemAttributes Prop for styling the bullets and line.*/
  @Prop() public pearlChainVerticalItemAttributes!: PearlChainVerticalItemAttributes;

  /** If true the position won't be animated. */
  @Prop() public disableAnimation?: boolean;

  public render(): JSX.Element {
    const {
      bulletColor,
      bulletType,
      lineType,
      lineColor,
      hideLine,
      minHeight,
      bulletSize,
      position,
    } = this.pearlChainVerticalItemAttributes || {};

    const bulletColorClass =
      position > 0 && position <= 100 ? 'sbb-color--metal' : `sbb-color--${bulletColor}`;
    const animation = this.disableAnimation
      ? 'sbb-pearl-chain-vertical-item-position__bullet--disable-animation'
      : '';

    return (
      <Host>
        <div class="sbb-pearl-chain-vertical-item__column" style={{ height: minHeight + 'px' }}>
          <slot name="left"></slot>
        </div>
        <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
          {!hideLine && (
            <div
              style={{ '--sbb-pearl-chain-vertical-item-leg-status': `${position}%` }}
              class={`sbb-pearl-chain-vertical-item__line sbb-pearl-chain-vertical-item__line--${lineType} sbb-color--${lineColor}`}
            ></div>
          )}
          {bulletType && (
            <div
              class={`sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--${bulletType} ${bulletColorClass} sbb-pearl-chain-vertical-item__bullet-size--${bulletSize}`}
            />
          )}
          {position > 0 && (
            <div
              style={{ '--sbb-pearl-chain-vertical-item-position': `${position}%` }}
              class={`sbb-pearl-chain-vertical-item-position__bullet ${animation}`}
            ></div>
          )}
        </div>
        <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right">
          <slot name="right"></slot>
        </div>
      </Host>
    );
  }
}
