import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFooter } from './footer';

const ssrModules = ['./footer.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-footer rendered with ${fixture.name}`, () => {
    let element: SbbFooter;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-footer></sbb-footer>`, { modules: ssrModules });
      assert.instanceOf(element, SbbFooter);
    });
  });
}
