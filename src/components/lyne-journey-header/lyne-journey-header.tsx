import {
  Component,
  h,
  Prop
} from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import iconOneWay from 'lyne-icons/dist/icons/arrow-long-right-small.svg';
import iconRoundTrip from 'lyne-icons/dist/icons/arrows-left-right-small.svg';
import { InterfaceJourneyHeaderAttributes } from './lyne-journey-header.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-journey-header.default.scss',
    shared: 'styles/lyne-journey-header.shared.scss'
  },
  tag: 'lyne-journey-header'
})

export class LyneJourneyHeader {

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

    const journeyIcon = this.isRoundTrip
      ? iconRoundTrip
      : iconOneWay;

    const TAGNAME = `${this.markup}`; // eslint-disable-line @typescript-eslint/no-unused-vars

    const className = `journey-header journey-header--${this.appearance} journey-header--size-${this.size}`;

    const currentWritingMode = getDocumentWritingMode();

    const attrs = {
      class: className
    };

    if (this.journeyHeaderId && this.journeyHeaderId !== '') {
      attrs['id'] = this.journeyHeaderId;
    }

    return (
      <TAGNAME {...attrs}
        dir={currentWritingMode}
        itemscope itemtype='https://schema.org/TravelAction'
      >
        <span
          class='journey-header__origin'
          itemprop='fromLocation' itemscope itemtype='https://schema.org/Place'
        >
          {this.origin}
        </span>
        <span class='journey-header__icon' innerHTML={journeyIcon}></span>
        <span
          class='journey-header__destination'
          itemprop='toLocation' itemscope itemtype='https://schema.org/Place'
        >
          {this.destination}
        </span>
      </TAGNAME>
    );
  }
}
