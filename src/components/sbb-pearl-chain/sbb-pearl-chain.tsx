import { Component, h, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes } from './sbb-pearl-chain.custom';
import legsData from './sbb-pearl-chain.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain.scss',
  tag: 'sbb-pearl-chain',
})
export class SbbPearlChain {
  /**
   * Define, if the pearl-chain represents a connection in the past,
   * in the future or if it is a currently running connection.
   * If it is currently running, provide a number between 0 and 100,
   * which will represent the current location on the pearl-chain.
   */
  @Prop() public status?: InterfacePearlChainAttributes['status'];

  /**
   * Stringified JSON to define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"cancellation": true, "duration": 25}, ...]}`
   * `duration`: number between 0 and 100. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   * `cancellation`: if set, the leg will be marked as canceled.
   */

  @Prop() public legs!: string;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  public render(): JSX.Element {
    const legs = legsData(this.legs);

    const statusClass = this.status === 'past' ? ' pearl-chain--past' : '';

    let departureCancelClass = '';
    let arrivalCancelClass = '';

    if (legs.length > 0) {
      departureCancelClass = legs[0].cancellation ? ' pearl-chain--departure-cancellation' : '';

      if (legs.length > 1) {
        arrivalCancelClass = legs[legs.length - 1].cancellation
          ? ' pearl-chain--arrival-cancellation'
          : '';
      }

      if (legs.length === 1) {
        arrivalCancelClass = legs[0].cancellation ? ' pearl-chain--arrival-cancellation' : '';
      }
    }

    const classes = `pearl-chain${statusClass}${departureCancelClass}${arrivalCancelClass}`;
    const statusIsRunning = this.status && this.status !== 'past' && this.status !== 'future';

    if (statusIsRunning) {
      if (this.status > 100) {
        this.status = 100;
      } else if (this.status < 0) {
        this.status = 0;
      }
    }

    const statusStyle = statusIsRunning
      ? {
          '--status-position': `${this.status}`,
        }
      : {};

    const animationClass = this.disableAnimation ? ' pearl-chain__status--no-animation' : '';

    return (
      <div class={classes}>
        {/* render legs */}
        {legs.map((leg) => {
          const legStyle = {
            'flex-basis': `${leg.duration}%`,
          };

          const legCancelClass = leg.cancellation ? ' pearl-chain__leg--cancellation' : '';

          return <div class={`pearl-chain__leg${legCancelClass}`} style={legStyle}></div>;
        })}

        {/* render current location point */}
        {statusIsRunning ? (
          <span style={statusStyle} class={`pearl-chain__status${animationClass}`}></span>
        ) : (
          ''
        )}
      </div>
    );
  }
}
