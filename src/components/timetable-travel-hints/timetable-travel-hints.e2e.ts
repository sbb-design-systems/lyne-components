import sampleData from './timetable-travel-hints.sample-data';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableTravelHints } from './timetable-travel-hints';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-travel-hints', () => {
  let element: SbbTimetableTravelHints;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-travel-hints config="${config}"></sbb-timetable-travel-hints>`,
    );
    assert.instanceOf(element, SbbTimetableTravelHints);
  });
});
