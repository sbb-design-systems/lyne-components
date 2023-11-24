import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbCardBadge } from './card-badge';

const ssrModules = ['./card-badge.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-card-badge rendered with ${fixture.name}`, () => {
    let element: SbbCardBadge;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-card-badge></sbb-card-badge>`, { modules: ssrModules });
      assert.instanceOf(element, SbbCardBadge);
    });
  });
}
