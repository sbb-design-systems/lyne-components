import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbJourneyHeader } from './journey-header';

const ssrModules = ['./journey-header.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-journey-header rendered with ${fixture.name}`, () => {
    let element: SbbJourneyHeader;

    beforeEach(async () => {
      element = await fixture(html`<sbb-journey-header></sbb-journey-header>`, {
        modules: ssrModules,
      });
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbJourneyHeader);
    });
  });
}
