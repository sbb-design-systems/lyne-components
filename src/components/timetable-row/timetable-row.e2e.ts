import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition } from '../core/testing';

import { SbbTimetableRow } from './timetable-row';

const ssrModules = ['./timetable-row.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-row rendered with ${fixture.name}`, () => {
    let element: SbbTimetableRow;

    beforeEach(async () => {
      element = await fixture(html`<sbb-timetable-row></sbb-timetable-row>`, {
        modules: ssrModules,
      });
    });

    afterEach(() => {
      cleanupFixtures();
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
}
