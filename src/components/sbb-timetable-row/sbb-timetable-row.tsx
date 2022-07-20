import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  @Prop() public accessiblityLabel: string;

  @Prop() public pictogramName = 'tick-small';
  @Prop() public transportNumber?: string;
  @Prop() public direction = 'Richtung Hauptbahnhof';

  public render(): JSX.Element {
    return (
      // <sbb-timetable-row-button role="presentation" accessiblity-label={this.accessiblityLabel}>
      <div class={`timetable__row`} role="row">
        <slot name="badge" />
        <div class="timetable__row-header" role="rowheader">
          <slot name="pictogram"></slot>
          <slot name="transportNumber">
            <span>{this.transportNumber}</span>
          </slot>
          <slot name="direction"></slot>
        </div>

        <div class="timetable__row-body" role="gridcell">
          <slot name="walkTimeBefore" />
          <slot name="leftTime" />
          <slot name="pearlChain" />
          <slot name="rightTime" />
          <slot name="walkTimeAfter" />
        </div>

        <div class="timetable__row-footer" role="gridcell">
          <slot name="plattform" />
          <ul class="timetable__row-occupancy">
            <li>
              <slot name="occupancyFirstClass">
                1.
                <sbb-icon name="walk-small"></sbb-icon>
              </slot>
            </li>
            <li>
              <slot name="occupancySecondClass">
                2.
                <sbb-icon name="walk-small"></sbb-icon>
              </slot>
            </li>
          </ul>
          <slot name="travelHints"></slot>
          <slot name="duration"></slot>
          <slot name="warning" />
        </div>
      </div>
      // </sbb-timetable-row-button>
    );
  }
}
