import sampleData from './timetable-park-and-rail.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableParkAndRail } from './timetable-park-and-rail';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-park-and-rail', () => {
  let element: SbbTimetableParkAndRail;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-park-and-rail config="${config}"></sbb-timetable-park-and-rail>`,
    );
    assert.instanceOf(element, SbbTimetableParkAndRail);
  });
});
