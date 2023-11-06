import { EventSpy, waitForCondition } from '../core/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbTimetableRow } from './timetable-row';

describe('sbb-timetable-row', () => {
  let element: SbbTimetableRow;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-row></sbb-timetable-row>`);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTimetableRow);
  });

  describe('events', () => {
    it('emits an event when clicked', async () => {
      const card = element.shadowRoot.querySelector('sbb-card');
      const changeSpy = new EventSpy('click');

      card.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });
  });
});
