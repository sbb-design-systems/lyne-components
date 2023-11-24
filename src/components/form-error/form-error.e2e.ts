import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFormError } from './form-error';

const ssrModules = ['./form-error.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-form-error rendered with ${fixture.name}`, () => {
    let element: SbbFormError;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      await fixture(html`<sbb-form-error></sbb-form-error>`, { modules: ssrModules });

      element = document.querySelector('sbb-form-error');
      assert.instanceOf(element, SbbFormError);
    });
  });
}
