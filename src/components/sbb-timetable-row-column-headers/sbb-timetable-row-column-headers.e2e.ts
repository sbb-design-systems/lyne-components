import sampleData from './sbb-timetable-row-column-headers.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableRowColumnHeaders } from './sbb-timetable-row-column-headers';

const config = JSON.stringify(sampleData);

describe('sbb-timetable-row-column-headers', () => {
  let element: SbbTimetableRowColumnHeaders;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-row-column-headers
        config="${config}"
      ></sbb-timetable-row-column-headers>`,
    );
    assert.instanceOf(element, SbbTimetableRowColumnHeaders);
  });
});
