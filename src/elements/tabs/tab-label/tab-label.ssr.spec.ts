import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTabLabelElement } from './tab-label.js';

describe(`sbb-tab-label ssr`, () => {
  let root: SbbTabLabelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tab-label>Label</sbb-tab-label>`, {
      modules: ['./tab-label.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabLabelElement);
  });
});
