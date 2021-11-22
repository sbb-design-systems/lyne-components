import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: false,
  styleUrls: {
    default: 'styles/lyne-timetable-row.default.scss',
    shared: 'styles/lyne-timetable-row.shared.scss'
  },
  tag: 'lyne-timetable-row'
})

export class LyneTimetableRow {

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
      <div
        class='timetable__row'
        role='none'
      >
        <lyne-timetable-transportation-details
          config={JSON.stringify(config.details)}
          role='gridcell'
        >
        </lyne-timetable-transportation-details>
        <lyne-timetable-platform
          config={JSON.stringify(config.platform)}
          role='gridcell'
        ></lyne-timetable-platform>
        <lyne-timetable-occupancy
          config={JSON.stringify(config.occupancy)}
          role='gridcell'
        ></lyne-timetable-occupancy>
        <lyne-timetable-duration
          config={JSON.stringify(config.duration)}
          role='gridcell'
        ></lyne-timetable-duration>
      </div>
    );
  }
}
