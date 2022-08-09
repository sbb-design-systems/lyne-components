import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from '@stencil/core';

import {
  getLinkButtonAttributeList,
  getLinkButtonBaseAttributeList,
  LinkButtonProperties,
} from '../../global/interfaces/link-button-properties';
import { InterfaceLinkAttributes } from './sbb-link.custom';
import { hostContext } from '../../global/helpers/host-context';

/**
 * @slot icon - Slot used to display the icon, if one is set
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-link.scss',
  tag: 'sbb-link',
})
export class SbbLink implements LinkButtonProperties, ComponentInterface {
  /**
   * If set to true, the browser will
   * show the download dialog on click (optional).
   */
  @Prop() public download: boolean;

  /** The href value you want to link to (if its not present link becomes a button)*/
  @Prop() public href: string;

  /**
   * The icon name we want to use,
   * choose from the small icon variants from
   * the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/ (optional).
   * Inline variant doesn't support icons.
   */
  @Prop() public icon?: string;

  /**
   * Pass in an id, if you need to identify
   * the link element (optional).
   */
  @Prop() public idValue?: string;

  /**
   * The icon can either be place before or after
   * the text.
   */
  @Prop() public iconPlacement: InterfaceLinkAttributes['iconPlacement'] = 'start';

  /**
   * Negative coloring variant flag
   */
  @Prop() public negative: boolean;

  /**
   * Text size, the link should get in the
   * non button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Prop() public textSize: InterfaceLinkAttributes['textSize'] = 's';

  /**
   * Applies link inline styles (underline, inherit coloring/font-size etc).
   */
  @Prop() public variant: InterfaceLinkAttributes['variant'] = 'block';

  /**
   * Disabled attribute if link is used as button (optional)
   */
  @Prop() public disabled: boolean;

  /**
   * Name attribute if link is used as button (optional)
   */
  @Prop() public name: string;

  /**
   * Form attribute if link is used as button (optional)
   */
  @Prop() public form: string;

  /**
   * Type attribute if link is used as button (optional)
   */
  @Prop() public type: InterfaceLinkAttributes['buttonType'] = 'button';

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * If this is set to true an span element will be used
   * instead of an anchor or a button
   */
  @State() private _isStatic = false;

  /** Id which is sent in the click event payload */
  @Prop() public eventId: string;

  /**
   * Emits whenever the native button click event triggers.
   * TODO: similar to the one in sbb-button. To be fixed together.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-link-button_click',
  })
  public click: EventEmitter<any>;

  @Element() public el!: HTMLElement;

  public connectedCallback(): void {
    // Check if the current element is nested in either an `<a>` or `<button>` element.
    this._isStatic = !!hostContext('a,button', this.el);
  }

  public emitButtonClick(): void {
    if (!this.disabled) {
      this.click.emit(this.eventId);
    }
  }

  private _getClassString(): string {
    const textSizeClass = this.variant === 'inline' ? '' : ` sbb-link--text-${this.textSize}`;

    let iconPositionClass = '';

    if (this.icon) {
      iconPositionClass =
        this.iconPlacement === 'start'
          ? ' sbb-link--icon-placement-start'
          : ' sbb-link--icon-placement-end';
    }

    const inlineClass = this.variant === 'inline' ? ' sbb-link--inline' : '';
    const negativeClass = this.negative ? ' sbb-link--negative' : '';

    return `sbb-link${textSizeClass}${iconPositionClass}${inlineClass}${negativeClass}`;
  }

  /**
   * Render element
   */
  public render(): JSX.Element {
    let TAG_NAME: string;
    let attributeList: object = getLinkButtonBaseAttributeList(
      this.idValue,
      this._getClassString(),
      this
    );
    if (this._isStatic) {
      TAG_NAME = 'span';
    } else {
      TAG_NAME = this.href ? 'a' : 'button';
      attributeList = getLinkButtonAttributeList(this.idValue, this._getClassString(), this);
    }

    return (
      <TAG_NAME {...attributeList}>
        {this.variant !== 'inline' && (
          <slot name="icon">
            <sbb-icon name={this.icon} />
          </slot>
        )}
        <slot />
      </TAG_NAME>
    );
  }
}
