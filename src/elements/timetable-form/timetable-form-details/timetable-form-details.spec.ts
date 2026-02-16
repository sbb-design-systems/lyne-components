import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTimetableFormDetailsElement } from './timetable-form-details.component.ts';

describe('sbb-timetable-form-details', () => {
  let element: SbbTimetableFormDetailsElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-form-details></sbb-timetable-form-details>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormDetailsElement);
  });
});
