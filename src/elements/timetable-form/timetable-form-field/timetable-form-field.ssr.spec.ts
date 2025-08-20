import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTimetableFormFieldElement } from './timetable-form-field.component.js';

describe(`sbb-timetable-form-field ssr`, () => {
  let root: SbbTimetableFormFieldElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-timetable-form-field my-prop="Label"></sbb-timetable-form-field>`,
      {
        modules: ['./timetable-form-field.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableFormFieldElement);
  });
});
