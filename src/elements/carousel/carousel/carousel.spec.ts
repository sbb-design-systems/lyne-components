import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { fixture } from '../../core/testing/private.js';
import type { SbbCompactPaginatorElement } from '../../paginator.js';

import { SbbCarouselElement } from './carousel.component.js';

import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';

describe('sbb-carousel', () => {
  let element: SbbCarouselElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-carousel>
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
        <sbb-compact-paginator></sbb-compact-paginator>
      </sbb-carousel>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCarouselElement);
  });

  it('paginator should be configured', async () => {
    const paginator: SbbCompactPaginatorElement = element.querySelector('sbb-compact-paginator')!;
    expect(paginator).is.not.null;
    expect(paginator.pageSize).is.equal(1);
    expect(paginator.length).is.equal(3);
  });
});
