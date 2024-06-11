import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';

import { SbbTabLabelElement } from './tab-label.js';

describe(`sbb-tab-label ${fixture.name}`, () => {
  let root: SbbTabLabelElement;

  beforeEach(async () => {
    root = await fixture(html`<sbb-tab-label></sbb-tab-label>`, { modules: ['./tab-label.js'] });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabLabelElement);
  });
});
