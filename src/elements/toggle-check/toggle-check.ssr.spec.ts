import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbToggleCheckElement } from './toggle-check.component.js';

describe(`sbb-toggle-check ssr`, () => {
  let root: SbbToggleCheckElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-check id="focus-id" name="name" value="value"></sbb-toggle-check>`,
      {
        modules: ['./toggle-check.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleCheckElement);
  });
});
