import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';
import { InterfaceButtonAttributes } from './lyne-button.custom.d';

/**
 * @slot unnamed - Slot to render svg icon. You must pass an svg-element.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-button.default.scss',
    shared: 'styles/lyne-button.shared.scss'
  },
  tag: 'lyne-button'
})

export class LyneButton {

  /** Label text to show on the button */
  @Prop() public label? = '';

  /** Variant of the button, like primary, secondary etc. */
  @Prop() public variant?: InterfaceButtonAttributes['variant'] = 'primary';

  /** Size variant, either l or m. */
  @Prop() public size?: InterfaceButtonAttributes['size'] = 'l';

  /**
   * Set this property to true if you want only a visual represenation of a
   * button, but no interaction (a div instead of a button will be rendered).
   */
  @Prop() public visualButtonOnly?: boolean;

  /** Set to true to get a disabled button */
  @Prop() public disabled? = false;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon? = false;

  /** If you use an icon without a label, you must provide an iconDescription */
  @Prop() public iconDescription?: string;

  /** The type attribute to use for the button */
  @Prop() public type?: InterfaceButtonAttributes['type'] = 'button';

  /** The name attribute to use for the button */
  @Prop() public name?: string;

  /** The value attribute to use for the button */
  @Prop() public value?: string;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public ariaHaspopup?: InterfaceButtonAttributes['popup'];

  /**
   * Emits whenever the native button click event triggers.
   * TODO: Switch to a better event type during refactoring lyne-button.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'lyne-button_click'
  }) public click: EventEmitter<any>;

  public render(): JSX.Element {
    const hasNoLabel = !this.label || this.label.length < 1;

    // security exit, if neither label nor icon is provided via props
    if (hasNoLabel && !this.icon) {
      return <p>Config error: either label or icon must be provided</p>;
    }

    // security exit for icon only button with no icon description
    if (hasNoLabel && this.icon && !this.iconDescription) {
      return <p>Config error: you must provide an icon description</p>;
    }

    const sizeClass = `button--size-${this.size}`;
    const variantClass = `button--${this.variant}`;
    const iconClass = hasNoLabel
      ? 'button--icon-only'
      : '';
    const semanticClass = this.visualButtonOnly
      ? 'button--visual-only'
      : '';

    const buttonClass = `button ${variantClass} ${sizeClass} ${iconClass} ${semanticClass}`;

    const TAGNAME = this.visualButtonOnly
      ? 'div'
      : 'button';

    const mainAttributes = {
      class: buttonClass
    };

    const buttonAttributes = {
      ...mainAttributes,
      'aria-haspopup': this.ariaHaspopup,
      'disabled': this.disabled,
      'name': this.name,
      'onClick': (): void => {
        if (!this.visualButtonOnly) {
          this.click.emit(this.eventId);
        }
      },
      'type': this.type,
      'value': this.value
    };

    const finalAttributes = this.visualButtonOnly
      ? mainAttributes
      : buttonAttributes;

    return (
      <TAGNAME {...finalAttributes}>

        {this.icon && hasNoLabel && this.iconDescription
          ? <span class='button__icon-description'>{this.iconDescription}</span>
          : ''
        }

        {this.icon === true
          ? <span class='button__icon'><slot /></span>
          : ''
        }

        {hasNoLabel
          ? ''
          : <span class='button__label'>{this.label}</span>
        }

      </TAGNAME>
    );
  }
}
