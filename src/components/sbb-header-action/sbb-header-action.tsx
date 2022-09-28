import { Component, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import {
  ButtonType,
  getButtonAttributeList,
  getLinkAttributeList,
  LinkButtonProperties,
  LinkTargetType,
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
  @Prop() public actionHeaderId = `sbb-action-header-${++nextId}`;

  /**
   * Used to set the minimum breakpoint from which the text is displayed.
   * Eg. if set to 'large', the text will be visible for breakpoints large, wide, ultra,
   * and hidden for all the other.
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
        <TAG_NAME id={this.actionHeaderId} class={classString} {...attributeList}>
          <span class="header-action__icon">
            <slot name="icon">
              <sbb-icon name={this.icon} />
            </slot>
          </span>
          <span class="header-action__label">
            <slot />
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
