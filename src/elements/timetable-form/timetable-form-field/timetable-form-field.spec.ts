import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbTimetableFormFieldElement } from './timetable-form-field.component.js';

describe('sbb-timetable-form-field', () => {
  let element: SbbTimetableFormFieldElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-form-field></sbb-timetable-form-field>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormFieldElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbTimetableFormFieldElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
