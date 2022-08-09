import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
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
   *
   */
  @Prop() public actionHeaderId = `sbb-action-header.${++nextId}`;

  /**
   *
   */
  @Prop() public expandFrom: InterfaceSbbHeaderActionAttributes['expandFrom'] = 'medium';

  /**
   *
   */
  @Prop() public icon?: string;

  /**
   *
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   *
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   *
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   *
   */
  @Prop() public download: boolean | undefined;

  /**
   *
   */
  @Prop() public href: string | undefined;

  /**
   *
   */
  @Prop() public form: string | undefined;

  /**
   *
   */
  @Prop() public name: string | undefined;

  /**
   *
   */
  @Prop() public type: ButtonType | undefined;

  /**
   *
   */
  @Prop() public disabled: boolean | undefined;

  /**
   *
   */
  @Prop() public eventId: string;

  /**
   *
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-header-action-button_click',
  })
  public click: EventEmitter<any>;

  /**
   *
   */
  public emitButtonClick(): void {
    if (!this.disabled) {
      this.click.emit(this.eventId);
    }
  }

  public render(): JSX.Element {
    const attributeList = getLinkButtonAttributeList(this.actionHeaderId, '', this);
    const TAG_NAME: string = this.href ? 'a' : 'button';

    return (
      <TAG_NAME {...attributeList}>
        <slot name="icon">
          <sbb-icon name={this.icon} />
        </slot>
        <slot />
      </TAG_NAME>
    );
  }
}
