import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbHeaderLinkElement } from './header-link.component.ts';

describe(`sbb-header-link ssr`, () => {
  let root: SbbHeaderLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-header-link id="focus-id" href="#">Action</sbb-header-link>`,
      {
        modules: ['./header-link.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbHeaderLinkElement);
  });
});
