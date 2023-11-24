import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbVisualCheckbox } from './visual-checkbox';

const ssrModules = ['./visual-checkbox.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-visual-checkbox rendered with ${fixture.name}`, (): void => {
    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async (): Promise<void> => {
      const element: SbbVisualCheckbox = await fixture(
        html`<sbb-visual-checkbox></sbb-visual-checkbox>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbVisualCheckbox);
    });
  });
}
