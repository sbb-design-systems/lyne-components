import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableRowDayChange } from './timetable-row-day-change';
import sampleData from './timetable-row-day-change.sample-data';

const config = JSON.stringify(sampleData[1]);

const ssrModules = ['./timetable-row-day-change.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-row-day-change rendered with ${fixture.name}`, () => {
    let element: SbbTimetableRowDayChange;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-row-day-change config="${config}"></sbb-timetable-row-day-change>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableRowDayChange);
    });
  });
}
