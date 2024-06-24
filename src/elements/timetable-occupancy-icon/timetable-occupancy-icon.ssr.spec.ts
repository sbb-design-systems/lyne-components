import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTimetableOccupancyIconElement } from './timetable-occupancy-icon.js';

describe(`sbb-timetable-occupancy-icon ssr`, () => {
  let root: SbbTimetableOccupancyIconElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-timetable-occupancy-icon occupancy="low"></sbb-timetable-occupancy-icon>`,
      { modules: ['./timetable-occupancy-icon.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableOccupancyIconElement);
  });
});
