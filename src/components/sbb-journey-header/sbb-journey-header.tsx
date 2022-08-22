import { Component, h, JSX, Prop } from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import iconOneWay from 'lyne-icons/dist/icons/arrow-long-right-small.svg';
import iconRoundTrip from 'lyne-icons/dist/icons/arrows-left-right-small.svg';
import { InterfaceJourneyHeaderAttributes } from './sbb-journey-header.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-journey-header.scss',
  tag: 'sbb-journey-header',
})
export class SbbJourneyHeader {
  /** Origin location for the journey header */
  @Prop() public origin!: string;

  /** Destination location for the journey header */
  @Prop() public destination!: string;

  /**
   * Is the journey a round trip. If so it gets indicated through a roundtrip
   * icon
   */
  @Prop() public isRoundTrip?: boolean;

  /**
   * Journey header markup:
   * Depends on the context where the journey will be used but it is important
   * to pick the correct markup element to match to correct semantics
   */
  @Prop() public markup?: InterfaceJourneyHeaderAttributes['markup'] = 'span';

  /** Journey header appearance */
  @Prop() public appearance?: InterfaceJourneyHeaderAttributes['appearance'] = 'primary';

  /** Journey header size */
  @Prop() public size?: InterfaceJourneyHeaderAttributes['size'] = '5';

  /**
   * A11y Tip:
   * Sometimes we need to set an id, especially if we want to associate
   * a relationship with another element through the use of aria-labelledby
   * or aria-describedby or just offer an anchor target
   */
  @Prop() public journeyHeaderId?: '';

  public render(): JSX.Element {
    const journeyIcon = this.isRoundTrip ? iconRoundTrip : iconOneWay;

    /*
     * Connection text
     * @Todo i18n handling
     * @Todo Check if anybody did think about `via` connections yet? Or will
     * this component never show any `via` connections?
     */
    const connectionTextOrigin = 'Connection from';
    const connectionTextDestination = 'to';
    const connectionTextRoundtrip = this.isRoundTrip ? `and back to ${this.origin}` : '';

    const TAGNAME = `${this.markup}`; // eslint-disable-line @typescript-eslint/no-unused-vars

    const className = `journey-header journey-header--${this.appearance} journey-header--size-${this.size}`;

    const currentWritingMode = getDocumentWritingMode();

    const attrs = {
      class: className,
    };

    if (this.journeyHeaderId && this.journeyHeaderId !== '') {
      attrs['id'] = this.journeyHeaderId;
    }

    return (
      <TAGNAME {...attrs} dir={currentWritingMode}>
        <span class="connection-text-origin connection--visually-hidden">
          {connectionTextOrigin}
        </span>
        <span class="origin">{this.origin}</span>
        <span class="icon" innerHTML={journeyIcon}>
          <span class="connection-text-destination connection--visually-hidden">
            {connectionTextDestination}
          </span>
        </span>
        <span class="destination">{this.destination}</span>
        {this.isRoundTrip ? (
          <span class="connection-text-roundtrip connection--visually-hidden">
            {' '}
            {connectionTextRoundtrip}
          </span>
        ) : (
          ''
        )}
      </TAGNAME>
    );
  }
}
