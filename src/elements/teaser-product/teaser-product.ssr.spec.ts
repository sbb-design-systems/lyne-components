import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleImages from '../core/images.js';
import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTeaserProductElement } from './teaser-product.js';
import '../image.js';

describe(`sbb-teaser-product ssr`, () => {
  describe('renders', () => {
    let root: SbbTeaserProductElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-teaser-product>
            <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
            Content
            <span slot="footnote">Footnote</span>
          </sbb-teaser-product>
        `,
        {
          modules: ['./teaser-product.js', '../image.js'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbTeaserProductElement);
    });
  });
});
