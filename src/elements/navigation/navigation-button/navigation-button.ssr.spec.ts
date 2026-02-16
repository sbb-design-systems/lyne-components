import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbNavigationButtonElement } from './navigation-button.component.ts';

describe(`sbb-navigation-button ssr`, () => {
  let root: SbbNavigationButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-navigation-button id="focus-id">Navigation Action</sbb-navigation-button>`,
      { modules: ['./navigation-button.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbNavigationButtonElement);
  });
});
