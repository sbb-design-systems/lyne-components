import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableBarrierFreeElement } from './timetable-barrier-free';
import sampleData from './timetable-barrier-free.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-barrier-free', () => {
  let element: SbbTimetableBarrierFreeElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-barrier-free config="${config}"></sbb-timetable-barrier-free>`,
    );

    assert.instanceOf(element, SbbTimetableBarrierFreeElement);
  });
});
