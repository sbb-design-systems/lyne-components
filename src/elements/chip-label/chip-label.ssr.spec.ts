import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbChipLabelElement } from './chip-label.component.js';

describe(`sbb-chip-label ssr`, () => {
  let root: SbbChipLabelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-chip-label>Label</sbb-chip-label>`, {
      modules: ['./chip-label.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbChipLabelElement);
  });
});
