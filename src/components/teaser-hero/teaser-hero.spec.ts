import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleImages from '../core/images.js';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTeaserHeroElement } from './teaser-hero.js';

import './teaser-hero.js';
import '../image.js';

describe(`sbb-teaser-hero`, () => {
  describe('should render all properties', () => {
    let element: SbbTeaserHeroElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser-hero
          accessibility-label="label"
          href="https://www.sbb.ch"
          rel="external"
          target="_blank"
          link-content="Find out more"
          image-src="${sampleImages[1]}"
          image-alt="SBB CFF FFS Employee"
          >Break out and explore castles and palaces.</sbb-teaser-hero
        >`,
      );
    });

    it('Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('should render with slots', async () => {
    const root = await fixture(
      html`<sbb-teaser-hero accessibility-label="label" href="https://www.sbb.ch"
        >Break out and explore castles and palaces.<span slot="link-content">Find out more</span
        ><sbb-image
          slot="image"
          image-src="${sampleImages[1]}"
          alt="SBB CFF FFS Employee"
        ></sbb-image
      ></sbb-teaser-hero>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-teaser-hero accessibility-label="label" href="https://www.sbb.ch" dir="ltr" data-action data-link>
          Break out and explore castles and palaces.
          <span slot="link-content">Find out more</span>
          <sbb-image slot="image" image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
        </sbb-teaser-hero>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
