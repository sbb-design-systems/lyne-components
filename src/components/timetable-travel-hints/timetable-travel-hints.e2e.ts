import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableTravelHintsElement } from './timetable-travel-hints';
import sampleData from './timetable-travel-hints.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-travel-hints', () => {
  let element: SbbTimetableTravelHintsElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-timetable-travel-hints config="${config}"></sbb-timetable-travel-hints>`,
    );
    assert.instanceOf(element, SbbTimetableTravelHintsElement);
  });
});
