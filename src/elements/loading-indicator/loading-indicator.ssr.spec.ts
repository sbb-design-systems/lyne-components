import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbLoadingIndicatorElement } from './loading-indicator.js';

describe(`sbb-loading-indicator ssr`, () => {
  let root: SbbLoadingIndicatorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-loading-indicator></sbb-loading-indicator>`, {
      modules: ['./loading-indicator.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLoadingIndicatorElement);
  });
});
