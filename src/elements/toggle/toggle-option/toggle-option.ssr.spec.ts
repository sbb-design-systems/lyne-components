import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbToggleOptionElement } from './toggle-option.js';

describe(`sbb-toggle-option ssr`, () => {
  let root: SbbToggleOptionElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-option value="Value">Value label</sbb-toggle-option>`,
      {
        modules: ['./toggle-option.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleOptionElement);
  });
});
