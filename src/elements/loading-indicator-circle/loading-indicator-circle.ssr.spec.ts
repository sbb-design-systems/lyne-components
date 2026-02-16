import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbLoadingIndicatorCircleElement } from './loading-indicator-circle.component.ts';

describe(`sbb-loading-indicator-circle ssr`, () => {
  let root: SbbLoadingIndicatorCircleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-loading-indicator-circle></sbb-loading-indicator-circle>`,
      {
        modules: ['./loading-indicator-circle.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLoadingIndicatorCircleElement);
  });
});
