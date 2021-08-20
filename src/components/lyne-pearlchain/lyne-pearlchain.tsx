/**
 * TODO:
 * - storybook
 */

import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfacePearlchainAttributes } from './lyne-pearlchain.custom.d';
import legsData from './lyne-pearlchain.helper';

@Component({
  shadow: true,
  styleUrl: 'lyne-pearlchain.scss',
  tag: 'lyne-pearlchain'
})

export class LynePearlchain {

  /**
   * Define, if the pearlchain represents a connection in the past,
   * in the future or if it is a currently running connection.
   * If it is currently running, provide a number between 0 and 100,
   * which will represent the current location on the pearl-chain.
   */
  @Prop() public status?: InterfacePearlchainAttributes['status'];

  /**
   * Stringified JSON to define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"cancellation": true, "duration": 25}, ...]}`
   * `duration`: number between 0 and 100. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   * `cancellation`: if set, the leg will be marked as canceled.
   */

  @Prop() public legs?: string;

  public render(): JSX.Element {
    const legs = legsData(this.legs);

    const statusClass = this.status === 'past'
      ? ' perlchain--past'
      : '';

    let departureCancelClass = '';
    let arrivalCancelClass = '';

    if (legs.length > 1) {
      departureCancelClass = legs[0].cancellation
        ? ' pearlchain--departure-cancellation'
        : '';

      arrivalCancelClass = legs[legs.length - 1].cancellation
        ? ' pearlchain--arrival-cancellation'
        : '';
    }

    const classes = `pearlchain${statusClass}${departureCancelClass}${arrivalCancelClass}`;
    const statusIsRunning = this.status && this.status !== 'past' && this.status !== 'future';
    const statusStyle = statusIsRunning
      ? {
        '--status-position': `${this.status}`
      }
      : {};

    return (
      <div class={classes}>

        {/* render legs */}
        {legs.map((leg) => {
          const legStyle = {
            'flex-basis': `${leg.duration}%`
          };

          const cancelClass = leg.cancellation
            ? ' pearlchain__leg--cancellation'
            : '';

          return (
            <div
              class={`pearlchain__leg${cancelClass}`}
              style={legStyle}
            ></div>
          );
        })}

        {/* render current location point */}
        {statusIsRunning
          ? (
            <span
              style={statusStyle}
              class='pearlchain__status'
            ></span>
          )
          : ''
        }

        {/* render line container if no legs are provided */}
        {legs.length < 2
          ? (
            <span class='pearlchain__line'></span>
          )
          : ''
        }
      </div>
    );
  }
}
