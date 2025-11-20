import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private/fixture.js';
import { html } from 'lit/static-html.js';

import { SbbTimetableDurationElement } from './timetable-duration.component.ts';
import sampleData from './timetable-duration.sample-data.private.ts';

const config = JSON.stringify(sampleData[0]);

describe(`sbb-timetable-duration`, () => {
  let element: SbbTimetableDurationElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-duration config="${config}"></sbb-timetable-duration>`,
    );
    assert.instanceOf(element, SbbTimetableDurationElement);
  });
});
