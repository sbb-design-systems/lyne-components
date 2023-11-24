import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableTravelHints } from './timetable-travel-hints';
import sampleData from './timetable-travel-hints.sample-data';

const config = JSON.stringify(sampleData[0]);

const ssrModules = ['./timetable-travel-hints.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-travel-hints rendered with ${fixture.name}`, () => {
    let element: SbbTimetableTravelHints;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-travel-hints config="${config}"></sbb-timetable-travel-hints>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTimetableTravelHints);
    });
  });
}
