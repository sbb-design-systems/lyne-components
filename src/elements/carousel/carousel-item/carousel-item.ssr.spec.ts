import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCarouselItemElement } from './carousel-item.component.js';

describe(`sbb-carousel-item ssr`, () => {
  let root: SbbCarouselItemElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-carousel-item>
          <img src=${images[0]} alt="SBB image" />
        </sbb-carousel-item>
      `,
      {
        modules: ['./carousel-item.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselItemElement);
  });
});
