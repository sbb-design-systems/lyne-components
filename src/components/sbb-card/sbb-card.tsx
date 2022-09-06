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
   * It is used internally to show the `<sbb-card>`.
   *
   * @param size The size selected.
   * @returns True whether size is equal to m, l, xl or xxl.
   */
  private _showSBBBadge(size: string): boolean {
    return size === 'm' || size === 'l' || size === 'xl' || size === 'xxl';
  }

  public render(): JSX.Element {
    return (
      <Host class={{ card__badge: this._showSBBBadge(this.size) && this._hasBadge }}>
        {this._showSBBBadge(this.size) && (
          <slot
            name="badge"
            onSlotchange={(event) =>
              (this._hasBadge = (event.target as HTMLSlotElement).assignedElements().length > 0)
            }
          />
        )}
        <span class="card__content">
          <slot />
        </span>
      </Host>
    );
  }
}
