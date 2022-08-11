import { Component, h, Host, Prop, State } from '@stencil/core';
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
  @State() public hasBadge = false;

  /**
   * It is used internally to show the `<sbb-card>`.
   *
   * @param size The size selected.
   * @returns True whether size is equal to m, l, xl or xxl. False otherwise.
   */
  private static _showSBBBadge(size: string): boolean {
    return size === 'm' || size === 'l' || size === 'xl' || size === 'xxl';
  }

  private _onSlotBadgeChange(): void {
    this.hasBadge = true;
  }

  public render(): JSX.Element {
    return (
      <Host class={{ card__badge: SbbCard._showSBBBadge(this.size) && this.hasBadge }}>
        <span class="card__content">
          <slot />
        </span>
        {SbbCard._showSBBBadge(this.size) && (
          <span>
            <slot name="badge" onSlotchange={(): void => this._onSlotBadgeChange()} />
          </span>
        )}
      </Host>
    );
  }
}
