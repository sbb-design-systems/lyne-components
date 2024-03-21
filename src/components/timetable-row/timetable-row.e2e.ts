import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbCardElement } from '../card';
import { EventSpy, waitForCondition } from '../core/testing';
import { fixture } from '../core/testing/private';

import { SbbTimetableRowElement } from './timetable-row';

describe(`sbb-timetable-row with ${fixture.name}`, () => {
  let element: SbbTimetableRowElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-row></sbb-timetable-row>`, {
      modules: ['./timetable-row.ts'],
    });
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
