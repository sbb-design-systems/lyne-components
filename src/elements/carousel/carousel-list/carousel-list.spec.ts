import { assert, expect } from '@open-wc/testing';
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
          <img src=${images[0]} alt="SBB image" height="300" width="400" />
        </sbb-carousel-item>
        <sbb-carousel-item>
          <img src=${images[1]} alt="SBB image" height="300" width="400" />
        </sbb-carousel-item>
        <sbb-carousel-item>
          <img src=${images[2]} alt="SBB image" height="300" width="400" />
        </sbb-carousel-item>
      </sbb-carousel-list>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselListElement);
  });

  it('get dimensions from the first item', async () => {
    const elementHeight = getComputedStyle(element)
      .getPropertyValue('--sbb-carousel-list-height')
      .replaceAll('px', '');
    expect(+elementHeight).to.be.equal(300);
    const elementWidth = getComputedStyle(element)
      .getPropertyValue('--sbb-carousel-list-width')
      .replaceAll('px', '');
    expect(+elementWidth).to.be.equal(400);
  });
});
