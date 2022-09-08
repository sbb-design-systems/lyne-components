import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import {
  getButtonAttributeList,
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkButtonProperties,
  LinkTargetType,
} from '../../global/interfaces/link-button-properties';
import { InterfaceLinkAttributes } from './sbb-link.custom';
import { hostContext } from '../../global/helpers/host-context';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

/**
 * @slot unnamed - Link Content
 * @slot icon - Slot used to display the icon, if one is set
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-link.scss',
  tag: 'sbb-link',
})
export class SbbLink implements LinkButtonProperties, ComponentInterface {
  @Element() private _el!: HTMLElement;

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
   * Moves the icon to the end of the component if set to true (optional).
   */
  @Prop() public iconPlacement?: InterfaceLinkAttributes['iconPlacement'] = 'start';

  /**
   * The href value you want to link to (optional, if its not present link becomes a button)
   */
  @Prop() public href: string | undefined;

  /**
   * If set to true, the browser will show the download dialog on click (optional).
   */
  @Prop() public download?: boolean;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() public rel?: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @Prop() public target?: LinkTargetType | string | undefined;

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
   * The value associated with button `name` when it's submitted with the form data.
   */
  @Prop() public value?: string;

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
    this._isStatic = !!hostContext('a,button', this._el);
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
      this.iconPlacement === 'start'
        ? ' sbb-link--icon-placement-start'
        : ' sbb-link--icon-placement-end';
    const inlineClass = this.variant === 'inline' ? ' sbb-link--inline' : '';
    const negativeClass = this.negative ? ' sbb-link--negative' : '';

    return `sbb-link${textSizeClass}${iconPositionClass}${inlineClass}${negativeClass}`;
  }

  private _resolveRenderVariables(): {
    screenReaderNewWindowInfo?: boolean;
    attributes: Record<string, string>;
    tagName: 'a' | 'button' | 'span';
  } {
    if (this._isStatic) {
      return {
        tagName: 'span',
        attributes: getLinkButtonBaseAttributeList(this),
      };
    } else if (this.href) {
      return {
        tagName: 'a',
        attributes: getLinkAttributeList(this, this),
        screenReaderNewWindowInfo: !this.accessibilityLabel && this.target === '_blank',
      };
    }
    return { tagName: 'button', attributes: getButtonAttributeList(this) };
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    } = this._resolveRenderVariables();

    // See https://github.com/ionic-team/stencil/issues/2703#issuecomment-1050943715 on why form attribute is set with `setAttribute`
    return (
      <TAG_NAME
        id={this.idValue}
        class={this._getClassString()}
        {...attributes}
        ref={(btn) => this.form && btn?.setAttribute('form', this.form)}
      >
        {this.variant !== 'inline' && (
          <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        )}
        <slot />
        {screenReaderNewWindowInfo && (
          <span class="sbb-link__opens-in-new-window">
            . {i18nTargetOpensInNewWindow[getDocumentLang()]}
          </span>
        )}
      </TAG_NAME>
    );
  }
}
