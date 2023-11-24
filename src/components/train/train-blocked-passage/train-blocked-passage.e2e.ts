import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTrainBlockedPassage } from './train-blocked-passage';

const ssrModules = ['./train-blocked-passage.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-train-blocked-passage rendered with ${fixture.name}`, () => {
    let element: SbbTrainBlockedPassage;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`, {
        modules: ssrModules,
      });
      assert.instanceOf(element, SbbTrainBlockedPassage);
    });
  });
}
