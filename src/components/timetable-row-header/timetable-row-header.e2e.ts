import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableRowHeaderElement } from './timetable-row-header';
import sampleData from './timetable-row-header.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-row-header', () => {
  let element: SbbTimetableRowHeaderElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-row-header config="${config}"></sbb-timetable-row-header>`,
    );

    assert.instanceOf(element, SbbTimetableRowHeaderElement);
  });
});
