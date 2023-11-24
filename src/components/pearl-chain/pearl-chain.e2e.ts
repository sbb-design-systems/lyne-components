import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbPearlChain } from './pearl-chain';

const ssrModules = ['./pearl-chain.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-pearl-chain rendered with ${fixture.name}`, () => {
    let element: SbbPearlChain;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`, { modules: ssrModules });
      assert.instanceOf(element, SbbPearlChain);
    });
  });
}
