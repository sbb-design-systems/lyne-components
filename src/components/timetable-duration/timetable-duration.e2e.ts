import sampleData from './timetable-duration.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableDuration } from './timetable-duration';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-duration', () => {
  let element: SbbTimetableDuration;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-duration config="${config}"></sbb-timetable-duration>`,
    );
    assert.instanceOf(element, SbbTimetableDuration);
  });
});
