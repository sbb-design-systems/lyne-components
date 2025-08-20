import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTimetableFormElement } from './timetable-form.component.js';

describe(`sbb-timetable-form ssr`, () => {
  let root: SbbTimetableFormElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-timetable-form my-prop="Label"></sbb-timetable-form>`,
      {
        modules: ['./timetable-form.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableFormElement);
  });
});
