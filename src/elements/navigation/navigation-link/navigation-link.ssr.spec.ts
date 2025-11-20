import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbNavigationLinkElement } from './navigation-link.component.ts';

describe(`sbb-navigation-link ssr`, () => {
  let root: SbbNavigationLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-navigation-link href="#" id="focus-id">Navigation Action</sbb-navigation-link>`,
      { modules: ['./navigation-link.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationLinkElement);
  });
});
