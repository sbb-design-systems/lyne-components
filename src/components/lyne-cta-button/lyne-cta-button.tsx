import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-cta-button.events';
import Tokens from 'lyne-design-tokens/dist/js/tokens.commonjs';

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
  @Prop() public label = 'Default button text';

  /** Id which is send in the click event payload */
  @Prop() public eventId?: string;

  @Element() private element: HTMLElement;

  private buttonClick = (): void => {
    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: eventDetail
    });

    this.element.dispatchEvent(event);
  };

  public render(): JSX.Element {
    const style = {
      fontSize: Tokens.FontSizeRegular
    };

    return <button style={style} class='button' onClick={this.buttonClick}>{this.label}</button>;
  }
}
