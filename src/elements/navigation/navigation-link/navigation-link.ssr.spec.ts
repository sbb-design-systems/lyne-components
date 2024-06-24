import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbNavigationLinkElement } from './navigation-link.js';

describe(`sbb-navigation-link ssr`, () => {
  let root: SbbNavigationLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-navigation-link href="#" id="focus-id">Navigation Action</sbb-navigation-link>`,
      { modules: ['./navigation-link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationLinkElement);
  });
});
