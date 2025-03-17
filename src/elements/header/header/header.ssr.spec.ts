import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbHeaderElement } from './header.component.js';

describe(`sbb-header ssr`, () => {
  let root: SbbHeaderElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-header></sbb-header>`, {
      modules: ['./header.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbHeaderElement);
  });
});
