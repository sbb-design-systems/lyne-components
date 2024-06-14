import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';

import { SbbTabElement } from './tab.js';

describe(`sbb-tab-label ${fixture.name}`, () => {
  let root: SbbTabElement;

  beforeEach(async () => {
    root = await fixture(html`<sbb-tab><p>Content</p></sbb-tab>`, { modules: ['./tab.js'] });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabElement);
  });
});
