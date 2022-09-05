import { Component, h, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes, Leg } from './sbb-pearl-chain.custom';
import { isPast, differenceInMinutes, isFuture } from 'date-fns';
import { toDate } from 'date-fns-tz';

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

  private _departureTime = this.legs && toDate(this.legs[0]?.departure?.time);
  private _arrivalTime = this.legs && toDate(this.legs[this.legs?.length - 1].arrival?.time);

  private _getAllDuration(legs: InterfacePearlChainAttributes['legs']): number {
    return legs.reduce((sum: number, leg) => (sum += leg.duration), 0);
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
    const currentPosition = this._getProgress(this._departureTime, this._arrivalTime);

    const statusStyle = (): { [key: string]: string } => {
      if (currentPosition >= 10) {
        return {
          '--status-position': `${currentPosition}%`,
          transform: `translateX(-100%)`,
        };
      }

      return {
        '--status-position': `${currentPosition}%`,
      };
    };

    const animation = this.disableAnimation ? 'pearl-chain__position--no-animation' : '';

    if (currentPosition > 0 && currentPosition <= 100) {
      return <span style={statusStyle()} class={`pearl-chain__position ${animation}`}></span>;
    }
  }

  public render(): JSX.Element {
    const departureCancelClass = ((): string => {
      return this.legs && this.legs[0]?.serviceJourney?.serviceAlteration?.cancelled === true
        ? ' pearl-chain--departure-cancellation'
        : '';
    })();

    const arrivalCancelClass = ((): string => {
      if (this.legs?.length === 1) {
        return this.legs && this.legs[0]?.serviceJourney?.serviceAlteration?.cancelled === true
          ? ' pearl-chain--arrival-cancellation'
          : '';
      } else if (this.legs?.length > 1) {
        return this.legs &&
          this.legs[this.legs.length - 1]?.serviceJourney?.serviceAlteration?.cancelled === true
          ? 'pearl-chain--arrival-cancellation'
          : '';
      }
    })();

    const statusClass =
      this._departureTime && this._arrivalTime
        ? 'pearl-chain--' + this._getStatus(this._departureTime, this._arrivalTime)
        : '';

    return (
      <div class={`pearl-chain ${statusClass} ${arrivalCancelClass}  ${departureCancelClass}`}>
        {this._renderPosition()}
        {this.legs?.map((leg: Leg) => {
          const duration = this._getRelativeDuration(this.legs, leg);

          const departure = toDate(leg.departure?.time);
          const arrival = toDate(leg.arrival?.time);

          const legStyle = (): { [key: string]: string } => {
            if (this._getStatus(departure, arrival) === 'progress') {
              return {
                width: `${duration}%`,
                '--leg-status': `${this._getProgress(departure, arrival)}%`,
              };
            }

            return {
              width: `${duration}%`,
            };
          };

          const cancelled =
            leg.serviceJourney?.serviceAlteration?.cancelled === true
              ? 'pearl-chain__leg--cancellation'
              : '';

          const legStatus = this._getStatus(departure, arrival)
            ? 'pearl-chain__leg--' + this._getStatus(departure, arrival)
            : '';

          return (
            <div class={`pearl-chain__leg ${legStatus} ${cancelled}`} style={legStyle()}></div>
          );
        })}
      </div>
    );
  }
}
