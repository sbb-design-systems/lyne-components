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
  @Element() public el!: HTMLElement;

  /**
   * Applies link inline styles (underline, inherit coloring/font-size etc).
   */
  @Prop({ reflect: true }) public variant: InterfaceLinkAttributes['variant'] = 'block';

  /**
   * Negative coloring variant flag.
   */
  @Prop() public negative = false;

  /**
   * Text size, the link should get in the non-button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Prop() public textSize: InterfaceLinkAttributes['textSize'] = 's';

  /**
   * If this is set to true an span element will be used instead of an anchor or a button.
   * @internal
   */
  @State() private _isStatic = false;

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/ (optional).
   * Inline variant doesn't support icons.
   */
  @Prop() public iconName?: string;

  /**
   * The icon can either be place before or after the text (optional).
   */
  @Prop() public iconPlacement?: InterfaceLinkAttributes['iconPlacement'];

  /**
   * The href value you want to link to (optional, if its not present link becomes a button)
   */
  @Prop() public href: string | undefined;

  /**
   * If set to true, the browser will show the download dialog on click (optional).
   */
  @Prop() public download?: boolean;

  /**
   * Pass in an id, if you need to identify the link element (optional).
   */
  @Prop() public idValue?: string;

  /**
   * Name attribute if link is used as button (optional)
   */
  @Prop() public name: string | undefined;

  /**
   * Type attribute if link is used as button (optional)
   */
  @Prop() public type: InterfaceLinkAttributes['buttonType'] | undefined;

  /**
   * Emits whenever the native button click event triggers.
   * TODO: similar to the one in sbb-button. To be fixed together.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-link-button_click',
  })
  public click: EventEmitter<any> | undefined;

  /**
   * Form attribute if link is used as button (optional)
   */
  @Prop() public form?: string;

  /**
   * Disabled attribute if link is used as button (optional)
   */
  @Prop() public disabled?: boolean;

  /**
   * Id which is sent in the click event payload
   */
  @Prop() public eventId?: string;

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

  public connectedCallback(): void {
    // Check if the current element is nested in either an `<a>` or `<button>` element.
    this._isStatic = !!hostContext('a,button', this.el);
  }

  /**
   * Method triggered at button click to emit the click event (can be caught from parent component).
   */
  public emitButtonClick(): void {
    if (!this.disabled) {
      this.click.emit(this.eventId);
    }
  }

  /**
   * Generate the class attribute based on component's parameters.
   */
  private _getClassString(): string {
    const textSizeClass = this.variant === 'inline' ? '' : ` sbb-link--text-${this.textSize}`;
    const iconPositionClass =
      this.iconPlacement === 'end' ? ` sbb-link--icon-placement-${this.iconPlacement}` : '';
    const inlineClass = this.variant === 'inline' ? ' sbb-link--inline' : '';
    const negativeClass = this.negative ? ' sbb-link--negative' : '';

    return `sbb-link${textSizeClass}${iconPositionClass}${inlineClass}${negativeClass}`;
  }

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
          <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        )}
        <slot />
      </TAG_NAME>
    );
  }
}
