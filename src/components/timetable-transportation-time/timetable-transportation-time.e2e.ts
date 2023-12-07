import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableTransportationTimeElement } from './timetable-transportation-time';
import sampleData from './timetable-transportation-time.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-time', () => {
  let element: SbbTimetableTransportationTimeElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-transportation-time
        config="${config}"
      ></sbb-timetable-transportation-time>`,
    );
    assert.instanceOf(element, SbbTimetableTransportationTimeElement);
  });
});
