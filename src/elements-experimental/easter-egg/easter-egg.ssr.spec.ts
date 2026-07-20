import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbEasterEggElement } from './easter-egg.component.ts';

import '../easter-egg.ts';

describe(`sbb-easter-egg ssr`, () => {
  let root: SbbEasterEggElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-easter-egg></sbb-easter-egg>`, {
      modules: ['../easter-egg.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbEasterEggElement);
    assert.isFalse(root.isOpen);
  });
});
