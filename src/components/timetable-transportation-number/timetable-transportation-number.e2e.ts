import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableTransportationNumber } from './timetable-transportation-number';
import sampleData from './timetable-transportation-number.sample-data';

const config = JSON.stringify(sampleData.bus);

const ssrModules = ['./timetable-transportation-number.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-transportation-number rendered with ${fixture.name}`, () => {
    let element: SbbTimetableTransportationNumber;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-transportation-number
          config="${config}"
        ></sbb-timetable-transportation-number>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableTransportationNumber);
    });
  });
}
