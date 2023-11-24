import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbChip } from './chip';

const ssrModules = ['./chip.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-chip rendered with ${fixture.name}`, () => {
    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      const element: SbbChip = await fixture(html`<sbb-chip>Label</sbb-chip>`, {
        modules: ssrModules,
      });
      assert.instanceOf(element, SbbChip);
    });
  });
}
