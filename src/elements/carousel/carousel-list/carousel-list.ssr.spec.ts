import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';

import '../carousel-item/carousel-item.component.js';
import { SbbCarouselListElement } from './carousel-list.component.js';

describe(`sbb-carousel-list ssr`, () => {
  let root: SbbCarouselListElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
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
      `,
      {
        modules: ['./carousel-list.component.js', '../carousel-item/carousel-item.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselListElement);
  });
});
