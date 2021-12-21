import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-transportation-details.default.scss',
    shared: 'styles/lyne-timetable-transportation-details.shared.scss'
  },
  tag: 'lyne-timetable-transportation-details'
})

export class LyneTimetableDetails {

  /**
   * Stringified JSON to define the different outputs of the
   * occupancy predicition cell.
   * Format:
   * occupancyItems: [
   * {
   *    class: '1',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'low'
   * },
   * {
   *    class: '2',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'medium'
   *  }
   * ]
   */
  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);

    return (
      <div class='transportation-details'>
        <lyne-timetable-transportation-number
          config={JSON.stringify(config.transportationNumber)}
        ></lyne-timetable-transportation-number>
        {
          config.departureWalk.duration > 0
            ? <lyne-timetable-transportation-walk
              config={JSON.stringify(config.departureWalk)}
            ></lyne-timetable-transportation-walk>
            : ''
        }
        <lyne-timetable-transportation-time
          config={JSON.stringify(config.departureTime)}
        ></lyne-timetable-transportation-time>
        <lyne-pearl-chain
          legs={JSON.stringify(config.pearlChain.legs)}
          status={config.pearlChain.status}
        ></lyne-pearl-chain>
        <lyne-timetable-transportation-time
          config={JSON.stringify(config.arrivalTime)}
        ></lyne-timetable-transportation-time>
        {
          config.arrivalWalk.duration > 0
            ? <lyne-timetable-transportation-walk
              config={JSON.stringify(config.arrivalWalk)}
            ></lyne-timetable-transportation-walk>
            : ''
        }
      </div>
    );
  }
}
