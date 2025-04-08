import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTabElement } from './tab.component.js';

describe(`sbb-tab ssr`, () => {
  let root: SbbTabElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tab>Content</sbb-tab>`, {
      modules: ['./tab.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabElement);
  });
});
