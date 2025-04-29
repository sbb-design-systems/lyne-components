import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbHeaderButtonElement } from './header-button.component.js';

describe(`sbb-header-button ssr`, () => {
  let root: SbbHeaderButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-header-button id="focus-id">Action</sbb-header-button>`,
      {
        modules: ['./header-button.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbHeaderButtonElement);
  });
});
