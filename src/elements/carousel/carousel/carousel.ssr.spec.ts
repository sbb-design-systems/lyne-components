import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCarouselElement } from './carousel.component.js';

describe(`sbb-carousel ssr`, () => {
  let root: SbbCarouselElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-carousel></sbb-carousel>`, {
      modules: ['./carousel.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselElement);
  });
});
