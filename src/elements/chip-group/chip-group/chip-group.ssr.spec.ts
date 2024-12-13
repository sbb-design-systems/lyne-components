import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbChipGroupElement } from './chip-group.js';

describe(`sbb-chip-group ssr`, () => {
  let root: SbbChipGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-chip-group></sbb-chip-group>`, {
      modules: ['./chip-group.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbChipGroupElement);
  });
});
