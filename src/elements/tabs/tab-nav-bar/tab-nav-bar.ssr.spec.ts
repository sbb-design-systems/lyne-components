import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTabNavBarElement } from './tab-nav-bar.component.ts';

import '../../tabs.ts';

describe(`sbb-tab-nav-bar ssr`, () => {
  let root: SbbTabNavBarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tab-nav-bar></sbb-tab-nav-bar>`, {
      modules: ['../../tabs.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabNavBarElement);
  });
});
