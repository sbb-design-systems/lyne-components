import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTimetableFormDetailsElement } from './timetable-form-details.component.ts';

describe(`sbb-timetable-form-details ssr`, () => {
  let root: SbbTimetableFormDetailsElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-timetable-form-details></sbb-timetable-form-details>`,
      {
        modules: ['./timetable-form-details.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableFormDetailsElement);
  });
});
