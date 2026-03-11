import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCarouselElement } from './carousel.component.ts';

import '../../carousel.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-carousel ssr`, () => {
  let root: SbbCarouselElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-carousel>
          <sbb-carousel-list>
            <sbb-carousel-item>
              <img src=${imageUrl} alt="SBB image" height="300" width="400" />
            </sbb-carousel-item>
            <sbb-carousel-item>
              <img src=${imageUrl} alt="SBB image" height="300" width="400" />
            </sbb-carousel-item>
            <sbb-carousel-item>
              <img src=${imageUrl} alt="SBB image" height="300" width="400" />
            </sbb-carousel-item>
          </sbb-carousel-list>
        </sbb-carousel>
      `,
      {
        modules: ['../../carousel.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselElement);
  });
});
