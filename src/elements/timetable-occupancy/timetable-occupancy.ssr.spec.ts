import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTimetableOccupancyElement } from './timetable-occupancy.component.js';

describe(`sbb-timetable-occupancy ssr`, () => {
  let root: SbbTimetableOccupancyElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-timetable-occupancy first-class-occupancy="high"></sbb-timetable-occupancy> `,
      { modules: ['./timetable-occupancy.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableOccupancyElement);
  });
});
