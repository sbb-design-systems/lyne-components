import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbTimetableRowElement } from './timetable-row.component.ts';

describe(`sbb-timetable-row ssr`, () => {
  let root: SbbTimetableRowElement;

  beforeEach(async function () {
    // This test seems flakey for unknown reason, so we extend the timeout for this
    // specific test.
    this.timeout(20000);
    root = await ssrHydratedFixture(html`<sbb-timetable-row></sbb-timetable-row>`, {
      modules: ['./timetable-row.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableRowElement);
  });
});
