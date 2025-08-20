import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbTimetableFormSwapButtonElement } from './timetable-form-swap-button.component.js';

describe('sbb-timetable-form-swap-button', () => {
  let element: SbbTimetableFormSwapButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormSwapButtonElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbTimetableFormSwapButtonElement.events.myEventName);
    element.click();
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
