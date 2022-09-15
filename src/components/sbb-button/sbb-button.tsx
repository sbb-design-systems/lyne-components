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
import { InterfaceButtonAttributes } from './sbb-button.custom';
import {
  getButtonAttributeList,
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkButtonProperties,
} from '../../global/interfaces/link-button-properties';
import { InterfaceLinkAttributes } from '../sbb-link/sbb-link.custom';
import { hostContext } from '../../global/helpers/host-context';

@Component({
  shadow: true,
  styleUrl: 'sbb-button.scss',
  tag: 'sbb-button',
})
export class SbbButton implements LinkButtonProperties, ComponentInterface {
  @Element() private _el!: HTMLElement;

  /** set as icon-only, no label, no text */
  @Prop() public iconOnly = false;

  /** Variant of the button, like primary, secondary etc. */
  @Prop() public variant?: InterfaceButtonAttributes['variant'] = 'primary';

  /** Size variant, either l or m. */
  @Prop() public size?: InterfaceButtonAttributes['size'] = 'l';

  /** The href value you want to link to */
  @Prop() public href: string | undefined;

  /**
   * Set this property to true if you want only a visual representation of a
   * button, but no interaction (a div instead of a button will be rendered).
   */
  @Prop() public visualButtonOnly?: boolean;
  /**
   * If this is set to true an span element will be used instead of an anchor or a button.
   * @internal
   */
  @State() private _isStatic = false;

  /** Set to true to get a disabled button */
  @Prop() public disabled? = false;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon? = false;

  /**
   * The icon name we want to use,
   * choose from the small icon variants from
   * the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/ (optional).
   * Inline variant doesn't support icons.
   */
  @Prop() public iconName?: string;

  /** If you use an icon without a label, you must provide an iconDescription */
  @Prop() public iconDescription?: string;

  /** The type attribute to use for the button */
  @Prop() public type: InterfaceLinkAttributes['buttonType'] | undefined;

  /** The name attribute to use for the button */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button */
  @Prop() public value?: string;

  /**
   * Negative coloring variant flag
   */
  @Prop() public negative: boolean;

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
   * When an interaction of this button has an impact on another element(s) in the document, the id
   * of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute
   * to the relevant nested element.
   */
  @Prop() public accessibilityControls: string | undefined;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHasPopup: InterfaceButtonAttributes['popup'] | undefined;

  /**
   * Emits whenever the native button click event triggers.
   * TODO: Switch to a better event type during refactoring sbb-button.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-button_click',
  })
  public click: EventEmitter<any>;

  public connectedCallback(): void {
    // Check if the current element is nested in either an `<a>` or `<button>` element.
    this._isStatic = !!hostContext('a,button', this._el);
  }

  /**
   * Method triggered at button click to emit the click event (can be caught from parent component).
   */
  public emitButtonClick(): void {
    if (!this.disabled && !this.visualButtonOnly) {
      this.click.emit(this.eventId);
    }
  }

  /**
   * Generate the class attribute based on component's parameters.
   */
  private _getClassString(): string {
    const sizeClass = `sbb-button--size-${this.size}`;
    const variantClass = `sbb-button--${this.variant}`;
    const iconClass = this.iconOnly ? 'sbb-button--icon-only' : '';
    const semanticClass = this.visualButtonOnly ? 'sbb-button--visual-only' : '';
    const negativeClass = this.negative ? ' sbb-button--negative' : '';

    return `sbb-button ${variantClass} ${sizeClass} ${iconClass} ${semanticClass} ${negativeClass}`;
  }

  public render(): JSX.Element {
    let TAG_NAME: string;
    let attributeList: Record<string, string>;
    if (this._isStatic) {
      TAG_NAME = 'span';
      attributeList = getLinkButtonBaseAttributeList(this);
    } else if (this.href) {
      TAG_NAME = 'a';
      attributeList = getLinkAttributeList(this, this);
    } else {
      TAG_NAME = 'button';
      attributeList = getButtonAttributeList(this);
    }

    return (
      <TAG_NAME {...attributeList} class={this._getClassString()}>
        {this.icon && this.iconDescription && (
          <span class="sbb-button__icon-description">{this.iconDescription}</span>
        )}

        {this.icon && (
          <span class="sbb-button__icon">
            <slot name="icon" />
          </span>
        )}

        {!this.iconOnly && (
          <span class="sbb-button__label">
            <slot />
          </span>
        )}
      </TAG_NAME>
    );
  }
}
