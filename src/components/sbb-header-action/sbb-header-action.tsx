import { Component, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import {
  ButtonType,
  getButtonAttributeList,
  getLinkAttributeList,
  LinkButtonProperties,
  LinkTargetType,
  PopupType,
} from '../../global/interfaces/link-button-properties';
import { InterfaceSbbHeaderActionAttributes } from './sbb-header-action.custom';

let nextId = 0;

/**
 * @slot icon - Slot used to render the action icon.
 * @slot unnamed - Slot used to render the action text.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header-action.scss',
  tag: 'sbb-header-action',
})
export class SbbHeaderAction implements LinkButtonProperties {
  /**
   * Action element's id.
   */
  @Prop() public headerActionId = `sbb-header-action-${++nextId}`;

  /**
   * Used to set the minimum breakpoint from which the text is displayed.
   * E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra,
   * and hidden for all the others.
   */
  @Prop({ reflect: true }) public expandFrom: InterfaceSbbHeaderActionAttributes['expandFrom'] =
    'medium';

  /**
   * The icon name used in the action element. See sbb-icon components for more details.
   */
  @Prop() public icon?: string;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Indicates whether the browser will show the download dialog on click.
   */
  @Prop() public download: boolean | undefined;

  /**
   * The href value you want to link to.
   */
  @Prop() public href: string | undefined;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() public rel: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @Prop() public target: LinkTargetType | string | undefined;

  /**
   * Form attribute if component is displayed as a button.
   */
  @Prop() public form: string | undefined;

  /**
   * Name attribute if component is displayed as a button.
   */
  @Prop() public name: string | undefined;

  /**
   * Type attribute if component is displayed as a button.
   */
  @Prop() public type: ButtonType | undefined;

  /**
   * The value associated with button `name` when it's submitted with the form data.
   */
  @Prop() public value: string | undefined;

  /**
   * Id sent in the click event payload.
   */
  @Prop() public eventId: string;

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
   * Emits whenever the native button click event triggers.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-header-action-button_click',
  })
  public click: EventEmitter<string>;

  /**
   * Method triggered on button click.
   */
  public emitButtonClick(): void {
    this.click.emit(this.eventId);
  }

  public render(): JSX.Element {
    let TAG_NAME: string;
    let attributeList: object;
    let classString: string;

    if (this.href) {
      TAG_NAME = 'a';
      attributeList = getLinkAttributeList(this, this);
      classString = 'header-action__link';
    } else {
      TAG_NAME = 'button';
      attributeList = getButtonAttributeList(this);
      classString = 'header-action__button';
    }

    return (
      <Host>
        <TAG_NAME id={this.headerActionId} class={classString} {...attributeList}>
          <span class="header-action__icon">
            <slot name="icon">{this.icon && <sbb-icon name={this.icon} />}</slot>
          </span>
          <span class="header-action__text">
            <slot />
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
