import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTimetableFormElement } from './timetable-form.component.js';

describe('sbb-timetable-form', () => {
  let element: SbbTimetableFormElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-form></sbb-timetable-form>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormElement);
  });
});
