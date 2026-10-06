import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTeaserPanelElement } from './teaser-panel.component.ts';

import '../teaser-panel.ts';

describe(`sbb-teaser-panel ssr`, () => {
  let root: SbbTeaserPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-teaser-panel></sbb-teaser-panel>`, {
      modules: ['../teaser-panel.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserPanelElement);
  });
});
