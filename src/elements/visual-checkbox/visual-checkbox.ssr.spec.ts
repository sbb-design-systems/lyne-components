import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbVisualCheckboxElement } from './visual-checkbox.js';

describe(`sbb-visual-checkbox ssr`, () => {
  let root: SbbVisualCheckboxElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-visual-checkbox></sbb-visual-checkbox>`, {
      modules: ['./visual-checkbox.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbVisualCheckboxElement);
  });
});
