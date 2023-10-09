import sampleData from './sbb-timetable-transportation-time.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableTransportationTime } from './sbb-timetable-transportation-time';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-time', () => {
  let element: SbbTimetableTransportationTime;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-transportation-time
        config="${config}"
      ></sbb-timetable-transportation-time>`,
    );
    assert.instanceOf(element, SbbTimetableTransportationTime);
  });
});
