import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-menu-action.scss',
  tag: 'sbb-menu-action',
})
export class SbbMenuAction {
  /** Documentation for icon */
  @Prop() public icon?: string;

  /** Documentation for amount */
  @Prop() public amount?: string;

  /**
   * Emits whenever the menu action click event triggers.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu-action_click',
  })
  public click: EventEmitter<any>;

  private _handleActionClick = (): void => {
    this.click.emit('Menu action clicked!');
  };

  public render(): JSX.Element {
    return (
      <button class="sbb-action" onClick={this._handleActionClick}>
        <div class="sbb-action__content">
          <sbb-icon name={this.icon}></sbb-icon>
          <span class="sbb-action__label">{this.icon}</span>
          {this.amount && <span class="sbb-action__amount">{this.amount}</span>}
        </div>
      </button>
    );
  }
}
