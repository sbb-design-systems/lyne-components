import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable.default.scss',
    shared: 'styles/lyne-timetable.shared.scss'
  },
  tag: 'lyne-timetable'
})

export class LyneTimetable {

  @Prop() public config!: string;

  public render(): JSX.Element {

    const rowItems = JSON.parse(this.config);

    return (
      <div
        class='timetable'
        role='grid'
      >
        <div
          class='timetable__column-headers'
          role='row'
        >
          <div role='columnheader'>Details</div>
          <div role='columnheader'>Platform</div>
          <div role='columnheader'>Occupancy Forecast</div>
          <div role='columnheader'>Duration</div>
        </div>
        <lyne-timetable-row
          config={JSON.stringify(rowItems[0])}
          role='row'
        >
        </lyne-timetable-row>
        <lyne-timetable-row
          config={JSON.stringify(rowItems[1])}
          role='row'
        >
        </lyne-timetable-row>
      </div>
    );
  }
}
