import { Component, Event, EventEmitter, JSX, h, Host, Prop } from '@stencil/core';
import {
  ButtonType,
  getLinkButtonAttributeList,
  LinkButtonProperties,
} from '../../global/interfaces/link-button-properties';
import { InterfaceSbbHeaderActionAttributes } from './sbb-header-action.custom';

let nextId = 0;

/**
 * @slot icon - Slot used to render the action icon
 * @slot unnamed - Slot used to render the action label
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header-action.scss',
  tag: 'sbb-header-action',
})
export class SbbHeaderAction implements LinkButtonProperties {
  /**
   * Id of the action element.
   */
  @Prop() public actionHeaderId = `sbb-action-header-${++nextId}`;

  /**
   * Used to set the minimum breakpoint from which the label is displayed.
   * Eg. if set to 'large', the label will be visible for breakpoints large, wide, ultra,
   * and hidden for all the other.
   */
  @Prop() public expandFrom: InterfaceSbbHeaderActionAttributes['expandFrom'] = 'medium';

  /**
   * The icon name used in the element. See sbb-icon components for more details.
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
   * Id sent in the click event payload
   */
  @Prop() public eventId: string;

  /**
   * Emits whenever the native button click event triggers.
   * TODO: similar to the one in sbb-button. To be fixed together.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-header-action-button_click',
  })
  public click: EventEmitter<any>;

  /**
   * Method triggered on button click.
   */
  public emitButtonClick(): void {
    this.click.emit(this.eventId);
  }

  public render(): JSX.Element {
    let TAG_NAME: string;
    let attributeList: object;

    if (this.href) {
      TAG_NAME = 'a';
      attributeList = getLinkButtonAttributeList(this.actionHeaderId, 'header-action__link', this);
    } else {
      TAG_NAME = 'button';
      attributeList = getLinkButtonAttributeList(
        this.actionHeaderId,
        'header-action__button',
        this
      );
    }

    return (
      <Host expand-from={this.expandFrom}>
        <TAG_NAME {...attributeList}>
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
