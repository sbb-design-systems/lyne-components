import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbTimetableRowElement } from './timetable-row.js';

describe(`sbb-timetable-row ssr`, () => {
  let root: SbbTimetableRowElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-timetable-row></sbb-timetable-row>`, {
      modules: ['./timetable-row.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableRowElement);
  });
});
