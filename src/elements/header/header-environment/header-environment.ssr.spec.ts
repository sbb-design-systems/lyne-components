import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbHeaderEnvironmentElement } from './header-environment.component.ts';

describe(`sbb-header-environment ssr`, () => {
  let root: SbbHeaderEnvironmentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-header-environment>dev</sbb-header-environment>`, {
      modules: ['./header-environment.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbHeaderEnvironmentElement);
  });
});
