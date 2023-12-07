import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableDurationElement } from './timetable-duration';
import sampleData from './timetable-duration.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-duration', () => {
  let element: SbbTimetableDurationElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-duration config="${config}"></sbb-timetable-duration>`,
    );
    assert.instanceOf(element, SbbTimetableDurationElement);
  });
});
