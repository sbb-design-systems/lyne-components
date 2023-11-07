import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableOccupancy } from './timetable-occupancy';
import sampleData from './timetable-occupancy.sample-data';

const config = JSON.stringify(sampleData[3]);

describe('sbb-timetable-occupancy', () => {
  let element: SbbTimetableOccupancy;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-occupancy config="${config}"></sbb-timetable-occupancy>`,
    );
    assert.instanceOf(element, SbbTimetableOccupancy);
  });
});
