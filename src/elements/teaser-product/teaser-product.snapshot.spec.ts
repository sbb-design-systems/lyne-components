import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleImages from '../core/images.js';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTeaserProductElement } from './teaser-product.js';
import './teaser-product.js';
import '../image.js';

describe(`sbb-teaser-product`, () => {
  describe('renders', () => {
    let element: SbbTeaserProductElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-teaser-product href="https://www.sbb.ch">
          <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
          Content
          <span slot="footnote">Footnote</span>
        </sbb-teaser-product>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
