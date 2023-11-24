import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableTransportationTime } from './timetable-transportation-time';
import sampleData from './timetable-transportation-time.sample-data';

const config = JSON.stringify(sampleData[0]);

const ssrModules = ['./timetable-transportation-time.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-transportation-time rendered with ${fixture.name}`, () => {
    let element: SbbTimetableTransportationTime;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-transportation-time
          config="${config}"
        ></sbb-timetable-transportation-time>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableTransportationTime);
    });
  });
}
