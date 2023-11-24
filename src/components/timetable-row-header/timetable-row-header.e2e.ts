import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableRowHeader } from './timetable-row-header';
import sampleData from './timetable-row-header.sample-data';

const config = JSON.stringify(sampleData[0]);

const ssrModules = ['./timetable-row-header.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-row-header rendered with ${fixture.name}`, () => {
    let element: SbbTimetableRowHeader;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-row-header config="${config}"></sbb-timetable-row-header>`,
        { modules: ssrModules },
      );

      assert.instanceOf(element, SbbTimetableRowHeader);
    });
  });
}
