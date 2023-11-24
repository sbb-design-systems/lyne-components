import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../core/images';
import { waitForLitRender } from '../core/testing';

import { SbbTeaserHero } from './teaser-hero';
import '.';
import '../link';
import '../image';

const ssrModules = ['./teaser-hero.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-teaser-hero rendered with ${fixture.name}`, () => {
    let element: SbbTeaserHero;

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      element = await fixture(
        html`<sbb-teaser-hero
          href="https://www.sbb.ch"
          image-src="${images[0]}"
        ></sbb-teaser-hero>`,
        { modules: ssrModules },
      );
      assert.instanceOf(element, SbbTeaserHero);
    });

    it('should receive focus', async () => {
      element = await fixture(
        html`<sbb-teaser-hero href="link" id="focus-id">Hero content</sbb-teaser-hero>`,
        { modules: ssrModules },
      );

      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
}
