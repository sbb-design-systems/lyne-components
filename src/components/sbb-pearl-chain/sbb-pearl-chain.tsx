import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { PTRideLeg } from '../../global/interfaces/pearl-chain-properties';
import { differenceInMinutes, isAfter, isBefore } from 'date-fns';
import { removeTimezoneFromISOTimeString } from '../../global/helpers/timezone-helper';
import { isRideLeg } from './sbb-pearl-chain.helper';

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
  @Prop() public legs: PTRideLeg[];

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  @Element() private _element: HTMLElement;

  private _now(): number {
    const dataNow = +this._element.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  private _getAllDuration(legs: PTRideLeg[]): number {
    return legs?.reduce(
      (sum: number, leg) =>
        (sum += differenceInMinutes(
          removeTimezoneFromISOTimeString(leg.arrival?.time),
          removeTimezoneFromISOTimeString(leg.departure?.time)
        )),
      0
    );
  }

  private _isAllCancelled(legs: PTRideLeg[]): boolean {
    return legs?.every((leg) => leg?.serviceJourney?.serviceAlteration?.cancelled);
  }

  private _getRelativeDuration(legs: PTRideLeg[], leg: PTRideLeg): number {
    const duration = differenceInMinutes(
      removeTimezoneFromISOTimeString(leg.arrival?.time),
      removeTimezoneFromISOTimeString(leg.departure?.time)
    );
    const allDurations = this._getAllDuration(legs);

    if (allDurations === 0) return 100;
    return (duration / allDurations) * 100;
  }

  private _getProgress(start: Date, end: Date): number {
    const total = differenceInMinutes(end, start);
    const progress = differenceInMinutes(this._now(), start);

    return total && (progress / total) * 100;
  }

  private _getStatus(start: Date, end: Date): Status {
    if (isBefore(start, this._now()) && isAfter(end, this._now())) {
      return 'progress';
    } else if (isBefore(end, this._now())) {
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
    const rideLegs: PTRideLeg[] = this.legs?.filter((leg) => isRideLeg(leg));
    const departureTime =
      rideLegs?.length && removeTimezoneFromISOTimeString(rideLegs[0]?.departure?.time);
    const arrivalTime =
      rideLegs?.length &&
      removeTimezoneFromISOTimeString(rideLegs[rideLegs?.length - 1].arrival?.time);

    const departureCancelClass = ((): string => {
      return rideLegs && rideLegs[0]?.serviceJourney?.serviceAlteration?.cancelled
        ? ' sbb-pearl-chain--departure-cancellation'
        : '';
    })();

    const arrivalCancelClass = ((): string => {
      return rideLegs && rideLegs[rideLegs.length - 1]?.serviceJourney?.serviceAlteration?.cancelled
        ? 'sbb-pearl-chain--arrival-cancellation'
        : '';
    })();

    const statusClass =
      rideLegs &&
      departureTime &&
      arrivalTime &&
      !rideLegs[0]?.serviceJourney?.serviceAlteration?.cancelled
        ? 'sbb-pearl-chain--' + this._getStatus(departureTime, arrivalTime)
        : '';

    if (this._isAllCancelled(rideLegs)) {
      return (
        <div
          class={`sbb-pearl-chain sbb-pearl-chain--departure-cancellation sbb-pearl-chain--arrival-cancellation`}
        >
          <div class={`sbb-pearl-chain__leg sbb-pearl-chain__leg--cancellation`}></div>
        </div>
      );
    }
    return (
      <div class={`sbb-pearl-chain ${statusClass} ${arrivalCancelClass} ${departureCancelClass}`}>
        {rideLegs?.map((leg: PTRideLeg) => {
          const duration = this._getRelativeDuration(rideLegs, leg);
          const departure = removeTimezoneFromISOTimeString(leg.departure?.time);
          const arrival = removeTimezoneFromISOTimeString(leg.arrival?.time);
          const cancelled = leg.serviceJourney?.serviceAlteration?.cancelled
            ? 'sbb-pearl-chain__leg--cancellation'
            : '';

          const legStatus =
            !cancelled &&
            this._getStatus(departure, arrival) &&
            'sbb-pearl-chain__leg--' + this._getStatus(departure, arrival);

          const legStyle = (): Record<string, string> => {
            return {
              '--leg-width': `${duration}%`,
              ...(this._getStatus(departure, arrival) === 'progress' && !cancelled
                ? { '--leg-status': `${this._getProgress(departure, arrival)}%` }
                : {}),
            };
          };

          return (
            <div class={`sbb-pearl-chain__leg ${legStatus} ${cancelled}`} style={legStyle()}>
              {this._getStatus(departure, arrival) === 'progress' &&
                !cancelled &&
                this._renderPosition(departure, arrival)}
            </div>
          );
        })}
      </div>
    );
  }
}
