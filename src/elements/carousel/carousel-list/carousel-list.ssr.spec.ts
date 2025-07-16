import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCarouselListElement } from './carousel-list.component.js';

describe(`sbb-carousel-list ssr`, () => {
  let root: SbbCarouselListElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-carousel-list></sbb-carousel-list>`, {
      modules: ['./carousel-list.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCarouselListElement);
  });
});
