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
    const sizeClass = `button--${this.size}`;
    const variantClass = `button--${this.variant}`;
    const buttonClass = `button ${variantClass} ${sizeClass}`;

    return (
      <button disabled={this.disabled} class={buttonClass} onClick={this._buttonClick}>
        {this.icon === true
          ? <span class='button__icon'><slot /></span>
          : ''
        }
        <span class='button__label'>{this.label}</span>
      </button>
    );
  }
}
