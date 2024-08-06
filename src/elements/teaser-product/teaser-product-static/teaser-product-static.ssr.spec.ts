import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleImages from '../../core/images.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTeaserProductStaticElement } from './teaser-product-static.js';
import '../../image.js';

describe(`sbb-teaser-product-static ssr`, () => {
  describe('renders', () => {
    let root: SbbTeaserProductStaticElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-teaser-product-static>
            <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
            Content
            <span slot="footnote">Footnote</span>
          </sbb-teaser-product-static>
        `,
        {
          modules: ['./teaser-product-static.js', '../../image.js'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbTeaserProductStaticElement);
    });
  });
});
