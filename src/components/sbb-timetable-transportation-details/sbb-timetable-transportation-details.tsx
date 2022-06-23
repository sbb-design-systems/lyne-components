import { Component, h, Prop } from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-timetable-transportation-details.default.scss',
    shared: 'styles/sbb-timetable-transportation-details.shared.scss',
  },
  tag: 'sbb-timetable-transportation-details',
})
export class SbbTimetableTransportationDetails {
  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  public render(): JSX.Element {
    const config = JSON.parse(this.config);

    return (
      <div class="transportation-details">
        <sbb-timetable-transportation-number
          config={JSON.stringify(config.transportationNumber)}
        ></sbb-timetable-transportation-number>
        {config.departureWalk.duration > 0 ? (
          <sbb-timetable-transportation-walk
            config={JSON.stringify(config.departureWalk)}
          ></sbb-timetable-transportation-walk>
        ) : (
          ''
        )}
        <sbb-timetable-transportation-time
          config={JSON.stringify(config.departureTime)}
        ></sbb-timetable-transportation-time>
        <sbb-pearl-chain
          legs={JSON.stringify(config.pearlChain.legs)}
          status={config.pearlChain.status}
        ></sbb-pearl-chain>
        <sbb-timetable-transportation-time
          config={JSON.stringify(config.arrivalTime)}
        ></sbb-timetable-transportation-time>
        {config.arrivalWalk.duration > 0 ? (
          <sbb-timetable-transportation-walk
            config={JSON.stringify(config.arrivalWalk)}
          ></sbb-timetable-transportation-walk>
        ) : (
          ''
        )}
      </div>
    );
  }
}
