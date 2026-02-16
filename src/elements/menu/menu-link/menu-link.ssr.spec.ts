import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbMenuLinkElement } from './menu-link.component.ts';

describe(`sbb-menu-link ssr`, () => {
  let root: SbbMenuLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-menu-link href="#" id="focus-id">Menu Action</sbb-menu-link>`,
      {
        modules: ['./menu-link.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMenuLinkElement);
  });
});
