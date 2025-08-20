import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbTimetableFormElement } from './timetable-form.component.js';

describe('sbb-timetable-form', () => {
  let element: SbbTimetableFormElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-form></sbb-timetable-form>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbTimetableFormElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
