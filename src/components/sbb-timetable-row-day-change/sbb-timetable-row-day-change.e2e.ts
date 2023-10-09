import sampleData from './sbb-timetable-row-day-change.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableRowDayChange } from './sbb-timetable-row-day-change';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-row-day-change', () => {
  let element: SbbTimetableRowDayChange;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-row-day-change config="${config}"></sbb-timetable-row-day-change>`,
    );
    assert.instanceOf(element, SbbTimetableRowDayChange);
  });
});
