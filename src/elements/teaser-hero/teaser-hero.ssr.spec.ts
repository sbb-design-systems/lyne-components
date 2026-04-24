import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTeaserHeroElement } from './teaser-hero.component.ts';

import '../chip-label.ts';
import '../image.ts';
import '../teaser-hero.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-teaser-hero ssr`, () => {
  let root: SbbTeaserHeroElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch">
        <figure>
          <sbb-image image-src=${imageUrl}></sbb-image>
          <sbb-chip-label class="sbb-figure-overlap-start-start">Label</sbb-chip-label>
        </figure>
      </sbb-teaser-hero>`,
      { modules: ['../chip-label.ts', '../image.ts', '../teaser-hero.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserHeroElement);
  });
});
