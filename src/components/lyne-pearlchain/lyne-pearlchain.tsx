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
  @Prop() public status?: InterfacePearlchainAttributes['status'] = 50;

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
  @Prop() public stations?: string;

  public render(): JSX.Element {
    this.vertical = false;
    this.departurePointCancellation = false;
    this.arrivalPointCancellation = false;
    this.stations = JSON.stringify({
      stations: [
        {
          location: 25
        },
        {
          location: 75
        }
      ]
    });

    const {
      stations
    } = JSON.parse(this.stations);

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
        '--status-position': `${this.status}%`
      }
      : {};

    return (
      <div class={classes}>
        <div class='pearlchain__line'>

          {/* render stations */}
          {stations.map((station) => <div class='pearlchain__station' style={{
            left: `${station.location}%`
          }}></div>)}

          {/* render current location point */}
          {statusIsRunning
            ? <div style={statusStyle} class='pearlchain__status'></div>
            : ''
          }
        </div>
      </div>
    );
  }
}
