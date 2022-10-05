import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
} from '@stencil/core';
import {
  ButtonType,
  getButtonAttributeList,
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkButtonProperties,
  LinkTargetType,
  PopupType,
} from '../../global/interfaces/link-button-properties';
import { InterfaceLinkAttributes } from './sbb-link.custom';
import { ACTION_ELEMENTS, hostContext } from '../../global/helpers/host-context';
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
  /** Variant of the link (block or inline). */
  @Prop({ reflect: true }) public variant: InterfaceLinkAttributes['variant'] = 'block';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /**
   * Text size, the link should get in the non-button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Prop({ reflect: true }) public textSize: InterfaceLinkAttributes['textSize'] = 's';

  /**
   * Set this property to true if you want only a visual representation of a
   * link, but no interaction (a span instead of a link/button will be rendered).
   */
  @Prop({ attribute: 'static', mutable: true, reflect: true }) public isStatic = false;

  /** Pass in an id, if you need to identify the inner element. */
  @Prop() public idValue?: string;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   * Inline variant doesn't support icons.
   */
  @Prop() public iconName?: string;

  /** Moves the icon to the end of the component if set to true. */
  @Prop() public iconPlacement?: InterfaceLinkAttributes['iconPlacement'] = 'start';

  /** The href value you want to link to (if its not present link becomes a button). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled? = false;

  /** The name attribute to use for the button. */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

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

  /** Emits the event on button click. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-link-button_click',
  })
  public click: EventEmitter;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this._element);
  }

  /**
   * Method triggered at button click to emit the click event (can be caught from parent component).
   */
  public emitButtonClick(): void {
    if (!this.disabled && !this.isStatic) {
      this.click.emit();
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
    if (this.isStatic) {
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
