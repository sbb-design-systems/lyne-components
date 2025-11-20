import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbLoadingIndicatorElement } from './loading-indicator.component.ts';

describe(`sbb-loading-indicator ssr`, () => {
  let root: SbbLoadingIndicatorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-loading-indicator></sbb-loading-indicator>`, {
      modules: ['./loading-indicator.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLoadingIndicatorElement);
  });
});
