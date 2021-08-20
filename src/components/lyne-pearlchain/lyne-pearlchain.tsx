import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfacePearlchainAttributes } from './lyne-pearlchain.custom.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-pearlchain.scss',
  tag: 'lyne-pearlchain'
})

export class LynePearlchain {

  /** If set, the pearlchain will be displayed vertically. */
  @Prop() public vertical?: boolean;

  /**
   * Define, if the pearlchain represents a connection in the past,
   * in the future or if it is a currently running connection.
   * If it is currently running, provide a number between 0 and 100,
   * which will represent the current location on the pearl-chain.
   */
  @Prop() public status?: InterfacePearlchainAttributes['status'] = 33;

  /** If set to true, the departure point will be marked as cancelled */
  @Prop() public departurePointCancellation?: boolean;

  /** If set to true, the arrival point will be marked as cancelled */
  @Prop() public arrivalPointCancellation?: boolean;

  /**
   * Stringified JSON to define the stations on the pearl-chain.
   * Format:
   * `{stations: [{location: number, cancellation?: boolean}]}`
   * `location`: number between 0 and 100, which will represent the
   * station on the pearl-chain
   * `cancellation`: if set, the station will be marked as canceled. In
   * this case, the connections to the previous and next stations will
   * be marked as cancelled as well.
   */
  @Prop() public legs?: string;

  public render(): JSX.Element {
    this.vertical = false;
    this.departurePointCancellation = false;
    this.arrivalPointCancellation = false;
    this.legs = JSON.stringify({
      legs: [
        {
          cancellation: true,
          duration: 25
        },
        {
          cancellation: false,
          duration: 25
        },
        {
          cancellation: false,
          duration: 50
        }
      ]
    });

    const {
      legs
    } = JSON.parse(this.legs);

    const verticalClass = this.vertical
      ? ' pearlchain--vertical'
      : ' pearlchain--horizontal';

    const statusClass = this.status === 'past'
      ? ' perlchain--past'
      : '';

    const classes = `pearlchain${verticalClass}${statusClass}`;
    const statusIsRunning = this.status !== 'past' && this.status !== 'future';
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
      </div>
    );
  }
}
