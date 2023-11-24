import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbMessage } from './message';

const ssrModules = ['./message.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-message rendered with ${fixture.name}`, () => {
    let element: SbbMessage;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(html`<sbb-message></sbb-message>`, { modules: ssrModules });
      assert.instanceOf(element, SbbMessage);
    });
  });
}
