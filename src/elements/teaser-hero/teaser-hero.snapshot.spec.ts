import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import type { SbbTeaserHeroElement } from './teaser-hero.js';
import './teaser-hero.js';
import '../image.js';
import '../chip.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-teaser-hero`, () => {
  let element: SbbTeaserHeroElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser-hero
          accessibility-label="label"
          href="https://www.sbb.ch"
          rel="external"
          target="_blank"
          link-content="Find out more"
          image-src=${imageUrl}
          image-alt="SBB CFF FFS Employee"
        >
          Break out and explore castles and palaces.
          <sbb-chip slot="chip">Label</sbb-chip>
        </sbb-teaser-hero>`,
      );
      await waitForImageReady(element.shadowRoot!.querySelector('sbb-image')!);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    testA11yTreeSnapshot();
  });

  describe('renders with slots', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser-hero accessibility-label="label" href="https://www.sbb.ch">
          Break out and explore castles and palaces.
          <span slot="link-content">Find out more</span>
          <sbb-image slot="image" image-src=${imageUrl} alt="SBB CFF FFS Employee"></sbb-image>
          </sbb-image>
          <sbb-chip slot="chip">Label</sbb-chip>
        </sbb-teaser-hero>`,
      );
      await waitForImageReady(element.querySelector('sbb-image')!);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
