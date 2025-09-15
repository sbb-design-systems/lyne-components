import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';

import { SbbCarouselItemElement } from './carousel-item.component.js';

describe('sbb-carousel-item', () => {
  let element: SbbCarouselItemElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel-item>
        <img src=${images[0]} alt="SBB image" />
      </sbb-carousel-item>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselItemElement);
  });
});
