import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTeaserStaticElement } from './teaser-static.component.ts';

import '../../teaser.ts';

describe(`sbb-teaser-static ssr`, () => {
  let root: SbbTeaserStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-teaser-static>Content</sbb-teaser-static>`, {
      modules: ['../../teaser.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserStaticElement);
  });
});
