import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCarouselItemElement } from './carousel-item.component.ts';

import '../../carousel.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-carousel-item ssr`, () => {
  let root: SbbCarouselItemElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-carousel-item>
          <img src=${imageUrl} alt="SBB image" />
        </sbb-carousel-item>
      `,
      {
        modules: ['../../carousel.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselItemElement);
  });
});
