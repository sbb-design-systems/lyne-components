import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbPearlChainVertical } from './pearl-chain-vertical';

const ssrModules = ['./pearl-chain-vertical.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-pearl-chain rendered with ${fixture.name}`, () => {
    let element: SbbPearlChainVertical;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`, {
        modules: ssrModules,
      });
      assert.instanceOf(element, SbbPearlChainVertical);
    });
  });
}
