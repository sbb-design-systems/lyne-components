import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import ButtonIcon from 'lyne-icons/dist/icons/service-bell-small.svg';
import events from './lyne-cta-button.events';
import { InterfaceButtonAttributes } from './lyne-cta-button.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-cta-button.scss',
  tag: 'lyne-cta-button'
})

export class LyneCtaButton {

  /**
   * @sampleDocTag sampleName - sampleValue
   * @sampleDocTag2 sampleName2 - sampleValue2
   */
  @Prop() public samplePropForJSDocs = 'sample prop';

  /** Label text to show on the button */
  @Prop() public label? = 'Default button text';

  /** Variant of the button, like primary, secondary etc. */
  @Prop() public variant?: InterfaceButtonAttributes['variant'] = 'primary';

  /** Set to true to get a disabled button */
  @Prop() public disabled? = false;

  /** Id which is send in the click event payload */
  @Prop() public eventId?: string;

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
    const typeClass = `button button--${this.variant}`;

    return <button disabled={this.disabled} class={typeClass} onClick={this._buttonClick}>
      <span class='button__icon' innerHTML={ButtonIcon} />
      <span>{this.label}</span>
    </button>;
  }
}
