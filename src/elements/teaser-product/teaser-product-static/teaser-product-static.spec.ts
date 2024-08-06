import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleImages from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';

import { SbbTeaserProductStaticElement } from './teaser-product-static.js';
import '../../image.js';

describe('sbb-teaser-product-static', () => {
  let element: SbbTeaserProductStaticElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-teaser-product-static>
        <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
        Content
        <span slot="footnote">Footnote</span>
      </sbb-teaser-product-static>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTeaserProductStaticElement);
  });
});
