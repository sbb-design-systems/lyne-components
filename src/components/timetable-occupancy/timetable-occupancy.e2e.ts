import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import { SbbTimetableOccupancy } from './timetable-occupancy';
import { occupancySampleData } from './timetable-occupancy.sample-data';

describe('sbb-timetable-occupancy', () => {
  let element: SbbTimetableOccupancy;

  beforeEach(async () => {
    element = await fixture(html` <sbb-timetable-occupancy></sbb-timetable-occupancy> `);

    await waitForLitRender(element);
    element.occupancy = occupancySampleData[9];
    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableOccupancy);
  });
});
