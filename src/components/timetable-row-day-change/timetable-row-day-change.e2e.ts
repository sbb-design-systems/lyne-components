import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableRowDayChangeElement } from './timetable-row-day-change';
import sampleData from './timetable-row-day-change.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-row-day-change', () => {
  let element: SbbTimetableRowDayChangeElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-row-day-change config="${config}"></sbb-timetable-row-day-change>`,
    );
    assert.instanceOf(element, SbbTimetableRowDayChangeElement);
  });
});
