import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableOccupancy } from './timetable-occupancy';
import sampleData from './timetable-occupancy.sample-data';

const config = JSON.stringify(sampleData[3]);

const ssrModules = ['./timetable-occupancy.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-occupancy rendered with ${fixture.name}`, () => {
    let element: SbbTimetableOccupancy;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-occupancy config="${config}"></sbb-timetable-occupancy>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableOccupancy);
    });
  });
}
