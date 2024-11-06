import { assert } from '@open-wc/testing';
import { html } from 'lit';

import images from '../core/images.js';
import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTeaserHeroElement } from './teaser-hero.js';
import '../chip.js';
import '../image.js';

describe(`sbb-teaser-hero ssr`, () => {
  let root: SbbTeaserHeroElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch">
        <figure>
          <sbb-image image-src=${images[0]}></sbb-image>
          <sbb-chip class="sbb-figure-overlap-start-start">Label</sbb-chip>
        </figure>
      </sbb-teaser-hero>`,
      { modules: ['./teaser-hero.js', '../image.js', '../chip.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserHeroElement);
  });
});
