import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableTransportationNumberElement } from './timetable-transportation-number';
import sampleData from './timetable-transportation-number.sample-data';

const config = JSON.stringify(sampleData.bus);

describe('sbb-timetable-transportation-number', () => {
  let element: SbbTimetableTransportationNumberElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-transportation-number
        config="${config}"
      ></sbb-timetable-transportation-number>`,
    );
    assert.instanceOf(element, SbbTimetableTransportationNumberElement);
  });
});
