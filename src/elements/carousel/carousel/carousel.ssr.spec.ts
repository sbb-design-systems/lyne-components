import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCarouselElement } from './carousel.component.js';
import '../carousel-item/carousel-item.component.js';
import '../carousel-list/carousel-list.component.js';

describe(`sbb-carousel ssr`, () => {
  let root: SbbCarouselElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
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
        </sbb-carousel>
      `,
      {
        modules: [
          './carousel.component.js',
          '../carousel-list/carousel-list.component.js',
          '../carousel-item/carousel-item.component.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselElement);
  });
});
