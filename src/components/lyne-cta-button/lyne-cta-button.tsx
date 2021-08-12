import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-cta-button.events';
import { InterfaceButtonAttributes } from './lyne-cta-button.d';

/**
 * @slot unnamed - Slot to render svg icon. You must pass an <svg> element.
 */

@Component({
  shadow: true,
  styleUrl: 'lyne-cta-button.scss',
  tag: 'lyne-cta-button'
})

export class LyneCtaButton {

  /** Label text to show on the button */
  @Prop() public label? = 'Default button text';

  /** Variant of the button, like primary, secondary etc. */
  @Prop() public variant?: InterfaceButtonAttributes['variant'] = 'primary';

  /** Size variant, either large or small. */
  @Prop() public size?: InterfaceButtonAttributes['size'] = 'large';

  /** Set to true to get a disabled button */
  @Prop() public disabled? = false;

  /** Id which is send in the click event payload */
  @Prop() public eventId?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon? = false;

  /** Define if icon should be shown or not */
  @Prop() public iconDescription?: string;

  @Element() private _element: HTMLElement;

  private _buttonClick = (): void => {
    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: eventDetail
    });

    this._element.dispatchEvent(event);
  };

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

    const sizeClass = `button--${this.size}`;
    const variantClass = `button--${this.variant}`;
    const iconClass = hasNoLabel
      ? 'button--icon-only'
      : 0;
    const buttonClass = `button ${variantClass} ${sizeClass} ${iconClass}`;

    return (
      <button disabled={this.disabled} class={buttonClass} onClick={this._buttonClick}>

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

      </button>
    );
  }
}
