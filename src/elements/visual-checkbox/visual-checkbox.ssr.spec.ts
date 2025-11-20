import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbVisualCheckboxElement } from './visual-checkbox.component.ts';

describe(`sbb-visual-checkbox ssr`, () => {
  let root: SbbVisualCheckboxElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-visual-checkbox></sbb-visual-checkbox>`, {
      modules: ['./visual-checkbox.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbVisualCheckboxElement);
  });
});
