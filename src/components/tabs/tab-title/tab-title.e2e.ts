import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTabTitle } from './tab-title';

const ssrModules = ['./tab-title.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-tab-title rendered with ${fixture.name}`, () => {
    let element: SbbTabTitle;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-tab-title></sbb-tab-title>`, { modules: ssrModules });
      assert.instanceOf(element, SbbTabTitle);
    });
  });
}
