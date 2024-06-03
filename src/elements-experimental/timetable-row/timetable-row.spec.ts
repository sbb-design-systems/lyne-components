import { assert, expect } from '@open-wc/testing';
import type { SbbCardElement } from '@sbb-esta/lyne-elements/card.js';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy, waitForCondition } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import { SbbTimetableRowElement } from './timetable-row.js';

describe(`sbb-timetable-row`, () => {
  let element: SbbTimetableRowElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-row></sbb-timetable-row>`);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTimetableRowElement);
  });

  describe('events', () => {
    it('emits an event when clicked', async () => {
      const card = element.shadowRoot!.querySelector<SbbCardElement>('sbb-card')!;
      const changeSpy = new EventSpy('click');

      card.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });
  });
});
