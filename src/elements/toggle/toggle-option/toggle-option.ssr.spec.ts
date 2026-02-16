import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbToggleOptionElement } from './toggle-option.component.ts';

describe(`sbb-toggle-option ssr`, () => {
  let root: SbbToggleOptionElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-option value="Value">Value label</sbb-toggle-option>`,
      {
        modules: ['./toggle-option.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleOptionElement);
  });
});
