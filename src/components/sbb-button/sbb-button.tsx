import { Component, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { InterfaceButtonAttributes } from './sbb-button.custom';
import { LinkButtonProperties } from '../../global/interfaces/link-button-properties';
import { InterfaceLinkAttributes } from '../sbb-link/sbb-link.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-button.scss',
  tag: 'sbb-button',
})
export class SbbButton implements LinkButtonProperties {
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

  /** Set to true to get a disabled button */
  @Prop() public disabled? = false;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon? = true;

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
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public ariaHaspopup?: InterfaceButtonAttributes['popup'];

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
   * Emits whenever the native button click event triggers.
   * TODO: Switch to a better event type during refactoring sbb-button.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-button_click',
  })
  public click: EventEmitter<any>;

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
    const sizeClass = `button--size-${this.size}`;
    const variantClass = `button--${this.variant}`;
    const iconClass = this.iconOnly ? 'button--icon-only' : '';
    const semanticClass = this.visualButtonOnly ? 'button--visual-only' : '';
    const negativeClass = this.negative ? ' button--negative' : '';

    return `button ${variantClass} ${sizeClass} ${iconClass} ${semanticClass} ${negativeClass}`;
  }

  public render(): JSX.Element {
    const TAGNAME = this.visualButtonOnly ? 'span' : this.type;

    const baseAttributes: object = {
      class: this._getClassString(),
    };

    let finalAttributes = baseAttributes;
    if (this.visualButtonOnly || this.type === 'span') {
      // is static: no additional attributes
      finalAttributes = baseAttributes;
    } else if (this.type === 'a') {
      // is a link
      finalAttributes = {
        ...baseAttributes,
        href: this.href,
        value: this.value,
        onClick: this.emitButtonClick.bind(this),
      };
    } else {
      // is a button
      finalAttributes = {
        ...baseAttributes,
        'aria-haspopup': this.ariaHaspopup,
        disabled: this.disabled,
        name: this.name,
        onClick: this.emitButtonClick.bind(this),
        type: this.type,
        value: this.value,
      };
    }

    return (
      <TAGNAME {...finalAttributes}>
        {this.icon && this.iconDescription && (
          <span class="button__icon-description">{this.iconDescription}</span>
        )}

        {this.icon && (
          <span class="button__icon">
            <slot name="icon" />
          </span>
        )}

        {!this.iconOnly && (
          <span class="button__label">
            <slot />
          </span>
        )}
      </TAGNAME>
    );
  }
}
