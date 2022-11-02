import { Component, h, Host, Prop } from '@stencil/core';
import { PearlChainItemAttributes } from './sbb-pearl-chain-vertical-item.custom';

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
  /** The pearlChainItemAttributes Prop for styling the dots and line.*/
  @Prop() public pearlChainItemAttributes: PearlChainItemAttributes;

  /** if true the position won't be animated */
  @Prop() public disableAnimation?: boolean;

  public render(): JSX.Element {
    const { dotColor, dotType, lineType, lineColor, hideLine, minHeight, dotSize, position } =
      this.pearlChainItemAttributes || {};

    const dotColorClass =
      position > 0 && position <= 100 ? 'sbb-color--metal' : `sbb-color--${dotColor}`;
    const animation = this.disableAnimation ? 'sbb-position__dot--disable-animation' : '';

    return (
      <Host class="sbb-pearl-chain-vertical-item">
        <div class="sbb-pearl-chain-vertical-item__column" style={{ height: minHeight + 'px' }}>
          <slot name="left"></slot>
        </div>
        <div class="sbb-pearl-chain-vertical-item__column">
          {!hideLine && (
            <div
              style={{ '--sbb-leg-status': `${position}%` }}
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
              style={{ '--sbb-position': `${position}%` }}
              class={`sbb-position__dot ${animation}`}
            ></div>
          )}
        </div>
        <div class="sbb-pearl-chain-vertical-item__column">
          <slot name="right"></slot>
        </div>
      </Host>
    );
  }
}
