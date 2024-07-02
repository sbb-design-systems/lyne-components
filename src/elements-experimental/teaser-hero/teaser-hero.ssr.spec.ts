import { assert } from '@open-wc/testing';
import images from '@sbb-esta/lyne-elements/core/images.js';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbTeaserHeroElement } from './teaser-hero.js';

describe(`sbb-teaser-hero ssr`, () => {
  let root: SbbTeaserHeroElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch" image-src="${images[0]}"></sbb-teaser-hero>`,
      { modules: ['./teaser-hero.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserHeroElement);
  });
});
