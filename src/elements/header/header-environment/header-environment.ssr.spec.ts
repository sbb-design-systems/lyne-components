import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbHeaderEnvironmentElement } from './header-environment.component.js';

describe(`sbb-header-environment ssr`, () => {
  let root: SbbHeaderEnvironmentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-header-environment></sbb-header-environment>`, {
      modules: ['./header-environment.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbHeaderEnvironmentElement);
  });
});
