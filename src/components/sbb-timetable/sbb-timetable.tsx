import { Component, h } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable.scss',
  tag: 'sbb-timetable',
})
export class SbbTimetable {
  public render(): JSX.Element {
    return (
      <div class="timetable-wrapper">
        <sbb-timetable-button appearance="earlier-connections"></sbb-timetable-button>
        <div class="timetable" role="grid">
          <slot />
        </div>
        <sbb-timetable-button appearance="later-connections"></sbb-timetable-button>
      </div>
    );
  }
}
