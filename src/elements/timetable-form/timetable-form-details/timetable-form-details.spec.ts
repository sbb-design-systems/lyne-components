import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbTimetableFormDetailsElement } from './timetable-form-details.component.js';

describe('sbb-timetable-form-details', () => {
  let element: SbbTimetableFormDetailsElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-form-details></sbb-timetable-form-details>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormDetailsElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbTimetableFormDetailsElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
