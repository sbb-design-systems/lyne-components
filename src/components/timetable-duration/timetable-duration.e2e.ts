import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private/index.js';

import { SbbTimetableDurationElement } from './timetable-duration.js';
import sampleData from './timetable-duration.sample-data.js';

const config = JSON.stringify(sampleData[0]);

describe(`sbb-timetable-duration with ${fixture.name}`, () => {
  let element: SbbTimetableDurationElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-duration config="${config}"></sbb-timetable-duration>`,
      { modules: ['./timetable-duration.ts'] },
    );
    assert.instanceOf(element, SbbTimetableDurationElement);
  });
});
