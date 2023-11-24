import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbJourneySummary } from './journey-summary';

const ssrModules = ['./journey-summary.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-journey-summary rendered with ${fixture.name}`, () => {
    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      const element = await fixture(html`<sbb-journey-summary></sbb-journey-summary>`, {
        modules: ssrModules,
      });
      assert.instanceOf(element, SbbJourneySummary);
    });
  });
}
