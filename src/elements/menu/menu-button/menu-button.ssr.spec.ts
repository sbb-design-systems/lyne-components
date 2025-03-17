import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbMenuButtonElement } from './menu-button.component.js';

describe(`sbb-menu-button ssr`, () => {
  let root: SbbMenuButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-menu-button id="focus-id">Menu Action</sbb-menu-button>`,
      {
        modules: ['./menu-button.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMenuButtonElement);
  });
});
