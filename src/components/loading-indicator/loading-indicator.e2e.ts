import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbLoadingIndicator } from './loading-indicator';

const ssrModules = ['./loading-indicator.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-loading-indicator rendered with ${fixture.name}`, () => {
    let element: SbbLoadingIndicator;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-loading-indicator></sbb-loading-indicator>`, {
        modules: ssrModules,
      });
      assert.instanceOf(element, SbbLoadingIndicator);
    });
  });
}
