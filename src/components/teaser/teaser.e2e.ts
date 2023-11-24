import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import { SbbTeaser } from './teaser';
import '.';

const ssrModules = ['./teaser.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-teaser rendered with ${fixture.name}`, () => {
    let element: SbbTeaser;

    afterEach(() => {
      cleanupFixtures();
    });

    it('should receive focus', async () => {
      element = await fixture(
        html`<sbb-teaser href="link" id="focus-id">Hero content</sbb-teaser>`,
        { modules: ssrModules },
      );

      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
}
