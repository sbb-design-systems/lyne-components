import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
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
      <div class={`timetable__row ${this._additionalTimetableRowClasses.join(' ')}`} role="none">
        <sbb-timetable-row-header
          config={JSON.stringify(config.rowHeader)}
          role="rowheader"
        ></sbb-timetable-row-header>
        <sbb-timetable-transportation-details
          config={JSON.stringify(config.details)}
          role="gridcell"
        ></sbb-timetable-transportation-details>
        <sbb-timetable-row-button expanded={false} role="gridcell"></sbb-timetable-row-button>
        <sbb-timetable-platform
          config={JSON.stringify(config.platform)}
          role="gridcell"
        ></sbb-timetable-platform>
        <sbb-timetable-occupancy
          config={JSON.stringify(config.occupancy)}
          role="gridcell"
        ></sbb-timetable-occupancy>
        <sbb-timetable-travel-hints
          config={JSON.stringify(config.travelHints)}
          role="gridcell"
        ></sbb-timetable-travel-hints>
        {/* <sbb-timetable-park-and-rail
          config={JSON.stringify(config.parkAndRail)}
          role='gridcell'
        >
        </sbb-timetable-park-and-rail> */}
        <sbb-timetable-duration
          config={JSON.stringify(config.duration)}
          role="gridcell"
        ></sbb-timetable-duration>
        <sbb-timetable-cus-him
          config={JSON.stringify(config.cusHim)}
          role="gridcell"
        ></sbb-timetable-cus-him>
      </div>
    );
  }
}
