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
  /** The pearlChainVerticalItemAttributes Prop for styling the dots and line.*/
  @Prop() public pearlChainVerticalItemAttributes: PearlChainVerticalItemAttributes;

  /** If true the position won't be animated. */
  @Prop() public disableAnimation?: boolean;

  public render(): JSX.Element {
    const { dotColor, dotType, lineType, lineColor, hideLine, minHeight, dotSize, position } =
      this.pearlChainVerticalItemAttributes || {};

    const dotColorClass =
      position > 0 && position <= 100 ? 'sbb-color--metal' : `sbb-color--${dotColor}`;
    const animation = this.disableAnimation
      ? 'sbb-pearl-chain-vertical-item-position__dot--disable-animation'
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
          {dotType !== 'double-bullet' ? (
            <div
              class={`sbb-pearl-chain-vertical-item__dot--${dotType} ${dotColorClass} sbb-pearl-chain-vertical-item__dot-size--${dotSize}`}
            />
          ) : (
            <div
              class={`sbb-pearl-chain-vertical-item__dot--thin-bullet sbb-color--${dotColor} sbb-pearl-chain-vertical-item__dot-size--ultra`}
            >
              <div
                class={`sbb-pearl-chain-vertical-item__dot--thin-bullet sbb-color--${dotColor} sbb-pearl-chain-vertical-item__dot-size--extra-small`}
              />
            </div>
          )}
          {position > 0 && (
            <div
              style={{ '--sbb-pearl-chain-vertical-item-position': `${position}%` }}
              class={`sbb-pearl-chain-vertical-item-position__dot ${animation}`}
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
