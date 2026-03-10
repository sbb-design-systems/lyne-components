import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTimetableFormElement } from './timetable-form.component.ts';

import '../../timetable-form.ts';

describe(`sbb-timetable-form ssr`, () => {
  let root: SbbTimetableFormElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-timetable-form></sbb-timetable-form>`, {
      modules: ['../../timetable-form.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableFormElement);
  });
});
