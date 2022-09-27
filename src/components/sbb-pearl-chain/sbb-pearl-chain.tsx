import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes, Leg } from './sbb-pearl-chain.custom';
import { isPast, isFuture, differenceInMinutes } from 'date-fns';

type Status = 'progress' | 'future' | 'past';
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

  private _departureTime = this.legs && new Date(Date.parse(this.legs[0]?.departure?.time));
  private _arrivalTime =
    this.legs && new Date(Date.parse(this.legs[this.legs?.length - 1].arrival?.time));

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
      return 'progress';
    } else if (isPast(end)) {
      return 'past';
    }
    return 'future';
  }

  private _renderPosition(start: Date, end: Date): JSX.Element {
    const currentPosition = this._getProgress(start, end);

    const statusStyle = (): Record<string, string> => {
      return {
        '--status-position': `${currentPosition}%`,
        ...(currentPosition >= 50 ? { transform: `translateX(-100%)` } : {}),
      };
    };

    const animation = this.disableAnimation ? 'sbb-pearl-chain__position--no-animation' : '';

    if (currentPosition > 0 && currentPosition <= 100) {
      return <span style={statusStyle()} class={`sbb-pearl-chain__position ${animation}`}></span>;
    }
  }

  public render(): JSX.Element {
    const departureCancelClass = ((): string => {
      return this.legs && this.legs[0]?.serviceJourney?.serviceAlteration?.cancelled
        ? ' sbb-pearl-chain--departure-cancellation'
        : '';
    })();

    const arrivalCancelClass = ((): string => {
      const firstCancelled =
        this.legs && this.legs[0]?.serviceJourney?.serviceAlteration?.cancelled;
      const lastCancelled =
        this.legs && this.legs[this.legs.length - 1]?.serviceJourney?.serviceAlteration?.cancelled;

      return firstCancelled || lastCancelled ? 'sbb-pearl-chain--arrival-cancellation' : '';
    })();

    const statusClass =
      this._departureTime && this._arrivalTime
        ? 'sbb-pearl-chain--' + this._getStatus(this._departureTime, this._arrivalTime)
        : '';

    return (
      <div class={`sbb-pearl-chain ${statusClass} ${arrivalCancelClass}  ${departureCancelClass}`}>
        {this.legs?.map((leg: Leg) => {
          const duration = this._getRelativeDuration(this.legs, leg);

          const departure = new Date(Date.parse(leg.departure?.time));
          const arrival = new Date(Date.parse(leg.arrival?.time));

          const legStyle = (): Record<string, string> => {
            return {
              width: `${duration}%`,
              ...(this._getStatus(departure, arrival) === 'progress'
                ? { '--leg-status': `${this._getProgress(departure, arrival)}%` }
                : {}),
            };
          };

          const cancelled = leg.serviceJourney?.serviceAlteration?.cancelled
            ? 'sbb-pearl-chain__leg--cancellation'
            : '';

          const legStatus =
            this._getStatus(departure, arrival) &&
            'sbb-pearl-chain__leg--' + this._getStatus(departure, arrival);

          return (
            <div class={`sbb-pearl-chain__leg ${legStatus} ${cancelled}`} style={legStyle()}>
              {this._getStatus(departure, arrival) === 'progress' &&
                this._renderPosition(departure, arrival)}
            </div>
          );
        })}
      </div>
    );
  }
}
