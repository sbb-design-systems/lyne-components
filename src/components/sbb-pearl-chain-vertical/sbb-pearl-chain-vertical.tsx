import { Component, h, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes, Leg } from './sbb-pearl-chain-vertical.custom';
import { isPast, differenceInMinutes, isFuture } from 'date-fns';
import { toDate } from 'date-fns-tz';

enum Status {
  progress = 'progress',
  future = 'future',
  past = 'past',

  // not part of journey
  excluded = 'excluded',
}
@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-vertical.scss',
  tag: 'sbb-pearl-chain-vertical',
})
export class SbbPearlChainVertical {
  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */

  @Prop() public legs!: InterfacePearlChainAttributes['legs'];

  @Prop() public dotVariant: InterfacePearlChainAttributes['variant'];

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

    return (leg.duration / allDurations) * 100;
  }

  private _getProgress(start: Date, end: Date): number {
    const total = differenceInMinutes(end, start);
    const progress = differenceInMinutes(Date.now(), start);

    return (progress / total) * 100;
  }

  private _getStatus(start: Date, end: Date): Status {
    if (isPast(start) && isFuture(end)) {
      return Status.progress;
    } else if (isPast(end)) {
      return Status.past;
    }
    return Status.future;
  }

  private _renderPosition(start: Date, end: Date): JSX.Element {
    const currentPosition = this._getProgress(start, end);

    const statusStyle = (): Record<string, string> => {
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
      return this.legs && this.legs[0]?.serviceJourney?.serviceAlteration?.cancelled
        ? ' pearl-chain--departure-cancellation'
        : '';
    })();

    const arrivalCancelClass = ((): string => {
      const firstCancelled =
        this.legs && this.legs[0]?.serviceJourney?.serviceAlteration?.cancelled;
      const lastCancelled =
        this.legs && this.legs[this.legs.length - 1]?.serviceJourney?.serviceAlteration?.cancelled;

      return firstCancelled || lastCancelled ? 'pearl-chain--arrival-cancellation' : '';
    })();

    const statusClass =
      this._departureTime && this._arrivalTime
        ? 'pearl-chain--' + this._getStatus(this._departureTime, this._arrivalTime)
        : '';

    const dotVariantClass = this.dotVariant ? 'pearl-chain--' + this.dotVariant : '';

    return (
      <div
        class={`pearl-chain ${dotVariantClass} ${statusClass} ${departureCancelClass} ${arrivalCancelClass}`}
      >
        {this.legs?.map((leg: Leg) => {
          const duration = this._getRelativeDuration(this.legs, leg);

          const departure = toDate(leg.departure?.time);
          const arrival = toDate(leg.arrival?.time);

          const legStyle = (): Record<string, string> => {
            return {
              height: `${duration}%`,
              ...(this._getStatus(departure, arrival) === Status.progress
                ? { '--leg-status': `${this._getProgress(departure, arrival)}%` }
                : {}),
            };
          };

          const cancelled = leg.serviceJourney?.serviceAlteration?.cancelled
            ? 'pearl-chain__leg--cancellation'
            : '';

          const legStatus =
            this._getStatus(departure, arrival) &&
            'pearl-chain__leg--' + this._getStatus(departure, arrival);

          return (
            <div class={`pearl-chain__leg ${legStatus} ${cancelled}`} style={legStyle()}>
              {this._getStatus(departure, arrival) === Status.progress &&
                this._renderPosition(departure, arrival)}
            </div>
          );
        })}
      </div>
    );
  }
}
