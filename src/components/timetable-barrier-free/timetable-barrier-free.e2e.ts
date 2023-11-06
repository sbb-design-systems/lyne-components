import sampleData from './timetable-barrier-free.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableBarrierFree } from './timetable-barrier-free';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-barrier-free', () => {
  let element: SbbTimetableBarrierFree;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-barrier-free config="${config}"></sbb-timetable-barrier-free>`,
    );

    assert.instanceOf(element, SbbTimetableBarrierFree);
  });
});
