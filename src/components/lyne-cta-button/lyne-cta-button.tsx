import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import Arrow from 'lyne-icons/dist/icons/lyne-arrow.svg';
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
      fontSize: Tokens.SizeFontRegular
    };

    return <button style={style} class='button' onClick={this.buttonClick}>
      <span class='label'>{this.label}</span>
      <span class='arrow' innerHTML={Arrow} />
      <lyne-link text='test link' link='https://www.sbb.ch'></lyne-link>
    </button>;
  }
}
