import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';
// import isTomorrow from 'date-fns/isTomorrow';

@Component({
  shadow: true,
  styleUrl: 'sbb-journey-summary.scss',
  tag: 'sbb-journey-summary',
})
export class SbbJourneySummary {
  // private _departureTime: Date =
  @Prop() public summaryConfig!: InterfaceJourneySummaryAttributes['config'];

  //
  private _renderJourneyStart(): JSX.Element {
    // if isTomorrow(departure) || isToday(departure)

    // return isTomorrow(departure) ?  <span>Tomorrow, <time></time></span> : <span>Today, <time></time></span>;
    // else

    return <time></time>;
  }

  public render(): JSX.Element {
    const { startPoint, destination, vias } = this.summaryConfig;
    return (
      <div class="journey-header">
        {startPoint && (
          <sbb-journey-header origin={startPoint} destination={destination}></sbb-journey-header>
        )}
        {
          vias &&
            vias.map((via) => {
              <ul class="journey-header__via">
                <li>{via}</li>
              </ul>;
            }) /** optional via */
        }
        {/**Date of the journey if (today || tomorrow ) => time left / Date */}

        <div class="journey-header__body">
          {/*walktimeBefore*/}
          {/*departureTime*/}
          <sbb-pearl-chain legs="" />
          {this._renderJourneyStart()}
          {/*arrivalTime*/}
          {/*walktimeAfter*/}
        </div>
        <div class="journey-header__footer">
          <slot name="controls" />
          <slot name="ticket" />
        </div>
      </div>
    );
  }
}
