import sampleData from './timetable-row-header.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableRowHeader } from './timetable-row-header';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-row-header', () => {
  let element: SbbTimetableRowHeader;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-row-header config="${config}"></sbb-timetable-row-header>`,
    );

    assert.instanceOf(element, SbbTimetableRowHeader);
  });
});
