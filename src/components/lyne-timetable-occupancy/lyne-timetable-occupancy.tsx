import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-occupancy.default.scss',
    shared: 'styles/lyne-timetable-occupancy.shared.scss'
  },
  tag: 'lyne-timetable-occupancy'
})

export class LyneTimetableOccupancy {

  /**
   * Stringified JSON to define the different outputs of the
   * transportations number cell.
   * Format:
   * {
   *  "direction": "Richtung Bern Wankdorf, Bahnhof",
   *  "meansOfTransport": {
   *    "picto": "<svg width=\"24\" height=\"24\"...></svg>",
   *    "text": "Bus"
   *  },
   *  "product":{
   *    "icon": "",
   *    "text":"B 20"
   *  }
   * }
   */
  @Prop() public config!: string;

  public render(): JSX.Element {

    const occupancyItems = JSON.parse(this.config).occupancyItems;

    return (
      <div role='none'>
        {occupancyItems.map((occupancyItem) => {
          return (
            <div>{occupancyItem.class}</div>
          );
        })}
      </div>
    );
  }
}
