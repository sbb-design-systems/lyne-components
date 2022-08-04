import { Component, h, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes, Leg } from './sbb-pearl-chain.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain.scss',
  tag: 'sbb-pearl-chain',
})
export class SbbPearlChain {
  private _currentTime = new Date();

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

  private _getLegStatus(leg: Leg): string {
    return leg.arrival?.time.getTime() < this._currentTime.getTime() ? 'past' : '';
  }

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

  private _getCurrentPositionTotal(legs: InterfacePearlChainAttributes['legs']): number {
    const progress = Math.abs(this._currentTime.getTime() - legs[0].departure?.time.getTime());
    const total = Math.abs(
      legs[legs.length - 1].arrival?.time.getTime() - legs[0].departure?.time.getTime()
    );

    return Math.round((progress / total) * 100);
  }

  private _renderPosition(): JSX.Element {
    const currentPosition = this._getCurrentPositionTotal(this.legs);

    const statusStyle = {
      '--status-position': `${currentPosition}%`,
    };

    if (currentPosition > 0 && currentPosition <= 100) {
      return <div style={statusStyle} class="pearl-chain__leg--position pearl-chain__status"></div>;
    }
  }

  public render(): JSX.Element {
    let departureCancelClass = '';
    let arrivalCancelClass = '';

    if (this.legs.length > 0) {
      departureCancelClass =
        this.legs[0].serviceJourney?.serviceAlteration?.cancelled === true
          ? ' pearl-chain--departure-cancellation'
          : '';

      if (this.legs.length > 1) {
        arrivalCancelClass =
          this.legs[this.legs.length - 1].serviceJourney?.serviceAlteration?.cancelled === true
            ? ' pearl-chain--arrival-cancellation'
            : '';
      }

      if (this.legs.length === 1) {
        arrivalCancelClass =
          this.legs[0].serviceJourney?.serviceAlteration?.cancelled === true
            ? ' pearl-chain--arrival-cancellation'
            : '';
      }
    }

    return (
      <div class={`pearl-chain ${arrivalCancelClass} ${departureCancelClass}`}>
        {this.legs.map((leg: Leg) => {
          const duration = this._getRelativeDuration(this.legs, leg);
          const legStyle = {
            'flex-basis': `${duration}%`,
          };

          const cancelled =
            leg.serviceJourney?.serviceAlteration?.cancelled === true
              ? 'pearl-chain__leg--cancellation'
              : '';

          return (
            <div
              class={`pearl-chain__leg pearl-chain--${this._getLegStatus(leg)} ${cancelled}`}
              style={legStyle}
            >
              {this._getLegStatus(leg)}
            </div>
          );
        })}
        {this._renderPosition()}
      </div>
    );
  }
}
