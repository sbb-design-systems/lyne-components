import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbIcon } from './icon';

const ssrModules = ['./icon.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-icon rendered with ${fixture.name}`, () => {
    let element: SbbIcon;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-icon></sbb-icon>`, { modules: ssrModules });

      assert.instanceOf(element, SbbIcon);
    });
  });
}
