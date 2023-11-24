import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableRowColumnHeaders } from './timetable-row-column-headers';
import sampleData from './timetable-row-column-headers.sample-data';

const config = JSON.stringify(sampleData);

const ssrModules = ['./timetable-row-column-headers.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-row-column-headers rendered with ${fixture.name}`, () => {
    let element: SbbTimetableRowColumnHeaders;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-row-column-headers
          config="${config}"
        ></sbb-timetable-row-column-headers>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableRowColumnHeaders);
    });
  });
}
