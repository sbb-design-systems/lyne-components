import { Component, h, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes, Leg } from './sbb-pearl-chain.custom';
import { isPast, differenceInMinutes, isFuture } from 'date-fns';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain.scss',
  tag: 'sbb-pearl-chain',
})
export class SbbPearlChain {
  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */

  @Prop() public legs!: InterfacePearlChainAttributes['legs'];

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  private _getAllDuration(legs: InterfacePearlChainAttributes['legs']): number {
    let sum = 0;

    legs.forEach((leg) => {
      sum += leg.duration;
    });
    return sum;
  }

  private _getRelativeDuration(legs: InterfacePearlChainAttributes['legs'], leg: Leg): number {
    const allDurations = this._getAllDuration(legs);

    return Math.round((leg.duration / allDurations) * 100);
  }

  private _getProgress(start: Date, end: Date): number {
    const progress = differenceInMinutes(Date.now(), start);
    const total = differenceInMinutes(end, start);

    return Math.round((progress / total) * 100);
  }

  private _getStatus(start: Date, end: Date): string {
    if (isFuture(start)) {
      return 'future';
    }
    if (isPast(start) && isPast(end)) {
      return 'past';
    }
    if (isPast(start) && isFuture(end)) {
      return 'progress';
    }
  }

  private _renderPosition(): JSX.Element {
    const currentPosition = this._getProgress(
      this.legs[0].departure?.time,
      this.legs[this.legs.length - 1].arrival?.time
    );

    let statusStyle = {
      '--status-position': `${currentPosition}%`,
    };

    if (currentPosition >= 10) {
      const defaultLegStyle = { ...statusStyle };
      statusStyle = { ...defaultLegStyle, ...{ transform: `translateX(-100%)` } };
    }

    if (currentPosition > 0 && currentPosition <= 100) {
      return <span style={statusStyle} class="pearl-chain__position"></span>;
    }
  }

  public render(): JSX.Element {
    let departureCancelClass = '';
    let arrivalCancelClass = '';
    let statusClass = '';

    if (this.legs?.length > 0) {
      departureCancelClass =
        this.legs[0].serviceJourney?.serviceAlteration?.cancelled === true
          ? ' pearl-chain--departure-cancellation'
          : '';

      if (this.legs?.length > 1) {
        arrivalCancelClass =
          this.legs[this.legs.length - 1].serviceJourney?.serviceAlteration?.cancelled === true
            ? ' pearl-chain--arrival-cancellation'
            : '';
      }

      if (this.legs?.length === 1) {
        arrivalCancelClass =
          this.legs[0].serviceJourney?.serviceAlteration?.cancelled === true
            ? ' pearl-chain--arrival-cancellation'
            : '';
      }

      statusClass =
        'pearl-chain--' +
        this._getStatus(
          this.legs[0].departure?.time,
          this.legs[this.legs.length - 1].arrival?.time
        );
    }

    return (
      <div class={`pearl-chain ${statusClass} ${arrivalCancelClass} ${departureCancelClass}`}>
        {this._renderPosition()}
        {this.legs?.map((leg: Leg) => {
          const duration = this._getRelativeDuration(this.legs, leg);
          let legStyle = {
            width: `${duration}%`,
          };

          if (this._getStatus(leg.departure?.time, leg.arrival?.time) === 'progress') {
            const defaultLegStyle = { ...legStyle };
            legStyle = {
              ...defaultLegStyle,
              ...{
                '--leg-status': `${this._getProgress(leg.departure?.time, leg.arrival?.time)}%`,
              },
            };
          }

          const cancelled =
            leg.serviceJourney?.serviceAlteration?.cancelled === true
              ? 'pearl-chain__leg--cancellation'
              : '';

          const legStatus = this._getStatus(leg.departure?.time, leg.arrival?.time)
            ? 'pearl-chain__leg--' + this._getStatus(leg.departure?.time, leg.arrival?.time)
            : '';

          return <div class={`pearl-chain__leg ${legStatus} ${cancelled}`} style={legStyle}></div>;
        })}
      </div>
    );
  }
}
