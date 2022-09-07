import { Component, h, Host, JSX, Prop, State } from '@stencil/core';
import { InterfaceSbbCardAttributes } from './sbb-card.custom';

/**
 * @slot unnamed - Slot to render the content.
 * @slot badge - Slot to render `<sbb-card-badge>`.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-card.scss',
  tag: 'sbb-card',
})
export class SbbCard {
  /**
   * Size variant, either xs, s, m, l, xl and xxl.
   */
  @Prop() public size?: InterfaceSbbCardAttributes['size'] = 'm';

  /* @internal */
  @State() private _hasBadge = false;

  /**
   * It is used internally to show the `<sbb-card-badge>`.
   *
   * @returns True whether size is equal to m, l, xl or xxl. False otherwise.
   */
  private _showSBBBadge(): boolean {
    return this.size === 'm' || this.size === 'l' || this.size === 'xl' || this.size === 'xxl';
  }

  public render(): JSX.Element {
    return (
      <Host class={{ 'sbb-card__badge': this._showSBBBadge() && this._hasBadge }}>
        {this._showSBBBadge() && (
          <span>
            <slot
              name="badge"
              onSlotchange={(event) =>
                (this._hasBadge = (event.target as HTMLSlotElement).assignedElements().length > 0)
              }
            />
          </span>
        )}
        <span class="card__content">
          <slot />
        </span>
      </Host>
    );
  }
}
