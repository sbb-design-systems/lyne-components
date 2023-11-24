import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTitle } from './title';

const ssrModules = ['./title.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-title rendered with ${fixture.name}`, () => {
    let element: SbbTitle;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      await fixture(html`<sbb-title></sbb-title>`, { modules: ssrModules });
      element = document.querySelector('sbb-title');
      assert.instanceOf(element, SbbTitle);
    });
  });
}
