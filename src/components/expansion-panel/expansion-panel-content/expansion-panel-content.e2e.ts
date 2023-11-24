import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbExpansionPanelContent } from './expansion-panel-content';

const ssrModules = ['./expansion-panel-content.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-expansion-panel-content rendered with ${fixture.name}`, () => {
    let element: SbbExpansionPanelContent;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbExpansionPanelContent);
    });
  });
}
