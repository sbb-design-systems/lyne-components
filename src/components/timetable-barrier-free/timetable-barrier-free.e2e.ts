import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableBarrierFree } from './timetable-barrier-free';
import sampleData from './timetable-barrier-free.sample-data';

const config = JSON.stringify(sampleData[0]);

const ssrModules = ['./timetable-barrier-free.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-timetable-barrier-free rendered with ${fixture.name}`, () => {
    let element: SbbTimetableBarrierFree;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-timetable-barrier-free config="${config}"></sbb-timetable-barrier-free>`,
        { modules: ssrModules },
      );

      assert.instanceOf(element, SbbTimetableBarrierFree);
    });
  });
}
