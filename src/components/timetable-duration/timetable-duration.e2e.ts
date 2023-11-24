import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableDuration } from './timetable-duration';
import sampleData from './timetable-duration.sample-data';

const config = JSON.stringify(sampleData[0]);

const ssrModules = ['./timetable-duration.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-duration rendered with ${fixture.name}`, () => {
    let element: SbbTimetableDuration;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-duration config="${config}"></sbb-timetable-duration>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableDuration);
    });
  });
}
