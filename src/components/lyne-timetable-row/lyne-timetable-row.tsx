import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-row.default.scss',
    shared: 'styles/lyne-timetable-row.shared.scss'
  },
  tag: 'lyne-timetable-row'
})

export class LyneTimetableRow {

  private _additionalTimetableRowClasses = [];

  private _getAdditionalStyleClasses(config): void {
    this._additionalTimetableRowClasses = [];

    if (config.details.departureWalk.duration > 0) {
      this._additionalTimetableRowClasses.push('timetable__row--departure-walk');
    }

    if (config.details.arrivalWalk.duration > 0) {
      this._additionalTimetableRowClasses.push('timetable__row--arrival-walk');
    }

  }

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);

    this._getAdditionalStyleClasses(config);

    return (
      <div
        class={`timetable__row ${this._additionalTimetableRowClasses.join(' ')}`}
        role='none'
      >
        <lyne-timetable-row-header
          config={JSON.stringify(config.rowHeader)}
          role='rowheader'
        >
        </lyne-timetable-row-header>
        <lyne-timetable-transportation-details
          config={JSON.stringify(config.details)}
          role='gridcell'
        >
        </lyne-timetable-transportation-details>
        <lyne-timetable-row-button
          expanded={false}
          role='gridcell'
        >
        </lyne-timetable-row-button>
        <lyne-timetable-platform
          config={JSON.stringify(config.platform)}
          role='gridcell'
        >
        </lyne-timetable-platform>
        <lyne-timetable-occupancy
          config={JSON.stringify(config.occupancy)}
          role='gridcell'
        >
        </lyne-timetable-occupancy>
        <lyne-timetable-travel-hints
          config={JSON.stringify(config.travelHints)}
          role='gridcell'
        >
        </lyne-timetable-travel-hints>
        {/* <lyne-timetable-park-and-rail
          config={JSON.stringify(config.parkAndRail)}
          role='gridcell'
        >
        </lyne-timetable-park-and-rail> */}
        <lyne-timetable-duration
          config={JSON.stringify(config.duration)}
          role='gridcell'
        >
        </lyne-timetable-duration>
        <lyne-timetable-cus-him
          config={JSON.stringify(config.cusHim)}
          role='gridcell'
        >
        </lyne-timetable-cus-him>
      </div>
    );
  }
}
