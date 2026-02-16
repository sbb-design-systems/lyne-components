import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTabNavBarElement } from './tab-nav-bar.component.ts';

describe(`sbb-tab-nav-bar ssr`, () => {
  let root: SbbTabNavBarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tab-nav-bar></sbb-tab-nav-bar>`, {
      modules: ['./tab-nav-bar.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabNavBarElement);
  });
});
