import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import {
  ButtonType,
  getLinkButtonAttributeList,
  LinkButtonProperties,
} from '../../global/interfaces/link-button-properties';

/**
 * @slot unnamed - Use this slot to provide the menu action label.
 */

// TODO --> nextId test mechanism
let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-menu-action.scss',
  tag: 'sbb-menu-action',
})
export class SbbMenuAction implements LinkButtonProperties {
  /**
   * This id will be forwarded to the relevant inner element.
   */
  @Prop() public menuActionId = `sbb-menu-action-${++nextId}`;

  /**
   * Documentation for the prop
   */
  @Prop() public download: boolean;

  /**
   * Documentation for the prop
   */
  @Prop() public href: string;

  /**
   * Documentation for the prop
   */
  @Prop() public disabled: boolean;

  /**
   * Documentation for the prop
   */
  @Prop() public name: string;

  /**
   * Form attribute if link is used as button
   */
  @Prop() public form: string;

  /**
   * Documentation for the prop
   */
  @Prop() public type: ButtonType;

  /**
   * Documentation for the prop
   */
  @Prop() public eventId: string;

  /**
   * Documentation for icon
   */
  @Prop() public icon: string;

  /**
   * Documentation for amount
   */
  @Prop() public amount: string;

  /**
   * Documentation for the prop
   */
  @Prop() public accessibilityLabel: string;

  /**
   * Documentation for the prop
   */
  @Prop() public accessibilityDescribedby: string;

  /**
   * Documentation for the prop
   */
  @Prop() public accessibilityLabelledby: string;

  /**
   * Emits whenever the menu action click event triggers.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu-action_click',
  })
  public click: EventEmitter<any>;

  public emitButtonClick(): void {
    if (!this.disabled) {
      this.click.emit(this.eventId);
    }
  }

  public render(): JSX.Element {
    let TAG_NAME: string;
    let attributeList: object;

    if (this.href) {
      TAG_NAME = 'a';
      attributeList = getLinkButtonAttributeList(this.menuActionId, 'sbb-menu-action__link', this);
    } else {
      TAG_NAME = 'button';
      attributeList = getLinkButtonAttributeList(
        this.menuActionId,
        'sbb-menu-action__button',
        this
      );
    }

    return (
      <TAG_NAME {...attributeList}>
        <div class="sbb-menu-action__content">
          <sbb-icon name={this.icon}></sbb-icon>
          <span class="sbb-menu-action__label">
            <slot />
          </span>
          {this.amount && <span class="sbb-menu-action__amount">{this.amount}</span>}
        </div>
      </TAG_NAME>
    );
  }
}
