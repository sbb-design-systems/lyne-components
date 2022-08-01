import { Component, h, Host, Prop } from '@stencil/core';
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

  /**
   * It is used internally to show the `<sbb-card>`.
   *
   * @param size The size selected.
   * @returns True whether size is equal to m, l, xl or xxl. False otherwise.
   */
  private _showSBBBadge(size: string): boolean {
    if (size === 'm' || size === 'l' || size === 'xl' || size === 'xxl') {
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    return (
      <Host>
        <span>
          <slot />
        </span>
        {this._showSBBBadge(this.size) && (
          <span>
            <slot name="badge" />
          </span>
        )}
      </Host>
    );
  }
}
