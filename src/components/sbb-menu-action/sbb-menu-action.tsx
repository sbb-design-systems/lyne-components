import { Component, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import {
  ButtonType,
  getButtonAttributeList,
  getLinkAttributeList,
  LinkButtonProperties,
  LinkTargetType,
  PopupType,
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
   * The name property passed to `sbb-icon` component.
   */
  @Prop() public icon?: string | undefined;

  /**
   * Value shown as badge at component end.
   */
  @Prop() public amount?: string | undefined;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Whether the browser will show the download dialog on click.
   */
  @Prop() public download: boolean | undefined;

  /**
   *  The href value you want to link to.
   */
  @Prop({ reflect: true }) public href: string | undefined;

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
  @Prop({ reflect: true }) public disabled = false;

  /**
   * The name of the button.
   */
  @Prop() public name: string | undefined;

  /**
   * The <form> element to associate the button with.
   */
  @Prop() public form: string | undefined;

  /**
   * Default behaviour of the button.
   */
  @Prop() public type: ButtonType | undefined;

  /**
   * The value associated with button `name` when it's submitted with the form data.
   */
  @Prop() public value: string | undefined;

  /**
   * When an interaction of this button has an impact on another element(s) in the document, the id
   * of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute
   * to the relevant nested element.
   */
  @Prop() public accessibilityControls: string | undefined;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHaspopup: PopupType | undefined;

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
      this.click.emit();
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
