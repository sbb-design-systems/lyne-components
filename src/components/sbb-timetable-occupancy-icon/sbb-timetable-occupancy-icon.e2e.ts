import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableOccupancyIcon } from './sbb-timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  let element: SbbTimetableOccupancyIcon;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-timetable-occupancy-icon occupancy="LOW"></sbb-timetable-occupancy-icon>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableOccupancyIcon);
  });
});
