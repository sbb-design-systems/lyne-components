import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbNavigationButtonElement } from './navigation-button.js';

describe(`sbb-navigation-button ssr`, () => {
  let root: SbbNavigationButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-navigation-button id="focus-id">Navigation Action</sbb-navigation-button>`,
      { modules: ['./navigation-button.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationButtonElement);
  });
});
