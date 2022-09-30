import { Component, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import {
  ButtonType,
  getButtonAttributeList,
  getLinkAttributeList,
  LinkButtonProperties,
  LinkTargetType,
} from '../../global/interfaces/link-button-properties';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to provide the menu action label.
 * @slot icon - Use this slot to provide an SVG icon. If `icon` is set, a sbb-icon will be used.
 */
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
   * Whether the browser will show the download dialog on click.
   */
  @Prop() public download: boolean;

  /**
   *  The href value you want to link to.
   */
  @Prop() public href: string;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() public rel: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @Prop() public target: LinkTargetType | string | undefined;

  /**
   * Whether the button is disabled.
   */
  @Prop() public disabled: boolean;

  /**
   * The name of the button.
   */
  @Prop() public name: string;

  /**
   * The <form> element to associate the button with.
   */
  @Prop() public form: string;

  /**
   * Default behaviour of the button.
   */
  @Prop() public type: ButtonType;

  /**
   * Id sent in the click event payload.
   */
  @Prop() public eventId: string;

  /**
   * The value associated with button `name` when it's submitted with the form data.
   */
  @Prop() public value: string | undefined;

  /**
   * The name property passed to `sbb-icon` component.
   */
  @Prop() public icon: string;

  /**
   * Value shown as badge at component end.
   */
  @Prop() public amount: string;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string;

  /**
   * Emits whenever the menu action is clicked.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu-action_click',
  })
  public click: EventEmitter<string>;

  /**
   * The function triggered on button click.
   */
  public emitButtonClick(): void {
    if (!this.disabled) {
      this.click.emit(this.eventId);
    }
  }

  public render(): JSX.Element {
    let TAG_NAME: string;
    let className: string;
    let attributeList: object;

    if (this.href) {
      TAG_NAME = 'a';
      attributeList = getLinkAttributeList(this, this);
      className = 'sbb-menu-action__link';
    } else {
      TAG_NAME = 'button';
      attributeList = getButtonAttributeList(this);
      className = 'sbb-menu-action__button';
    }

    return (
      <TAG_NAME id={this.menuActionId} class={className} {...attributeList}>
        <div class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon">{this.icon && <sbb-icon name={this.icon} />}</slot>
          </span>
          <span class="sbb-menu-action__label">
            <slot />
          </span>
          {this.amount && <span class="sbb-menu-action__amount">{this.amount}</span>}
        </div>
      </TAG_NAME>
    );
  }
}
