import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableParkAndRail } from './timetable-park-and-rail';
import sampleData from './timetable-park-and-rail.sample-data';

const config = JSON.stringify(sampleData[0]);

const ssrModules = ['./timetable-park-and-rail.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-park-and-rail rendered with ${fixture.name}`, () => {
    let element: SbbTimetableParkAndRail;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-park-and-rail config="${config}"></sbb-timetable-park-and-rail>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableParkAndRail);
    });
  });
}
