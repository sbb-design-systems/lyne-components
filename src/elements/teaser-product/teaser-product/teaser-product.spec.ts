import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleImages from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';

import { SbbTeaserProductElement } from './teaser-product.js';
import '../../image.js';

describe('sbb-teaser-product', () => {
  let element: SbbTeaserProductElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-teaser-product href="#">
        <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
        Content
        <span slot="footnote">Footnote</span>
      </sbb-teaser-product>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTeaserProductElement);
  });

  it('should receive focus', async () => {
    element.focus();
    expect(document.activeElement!.localName).to.be.equal('sbb-teaser-product');
  });
});
