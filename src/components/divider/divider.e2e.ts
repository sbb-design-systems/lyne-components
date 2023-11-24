import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbDivider } from './divider';

const ssrModules = ['./divider.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-divider rendered with ${fixture.name}`, () => {
    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      const element: SbbDivider = await fixture(html`<sbb-divider></sbb-divider>`, {
        modules: ssrModules,
      });
      assert.instanceOf(element, SbbDivider);
    });
  });
}
