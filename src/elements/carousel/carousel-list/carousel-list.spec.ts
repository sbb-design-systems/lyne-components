import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';

import { SbbCarouselListElement } from './carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';

describe('sbb-carousel-list', () => {
  let element: SbbCarouselListElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel-list>
        <sbb-carousel-item>
          <img src=${images[0]} alt="SBB image" />
        </sbb-carousel-item>
        <sbb-carousel-item>
          <img src=${images[1]} alt="SBB image" />
        </sbb-carousel-item>
        <sbb-carousel-item>
          <img src=${images[2]} alt="SBB image" />
        </sbb-carousel-item>
      </sbb-carousel-list>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselListElement);
  });
});
