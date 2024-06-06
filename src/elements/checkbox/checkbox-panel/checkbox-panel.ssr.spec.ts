import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';

import { SbbCheckboxPanelElement } from './checkbox-panel.js';

describe(`sbb-checkbox-panel ${fixture.name}`, () => {
  let root: SbbCheckboxPanelElement;

  beforeEach(async () => {
    root = await fixture(html`<sbb-checkbox-panel value="Value">Value label</sbb-checkbox-panel>`, {
      modules: ['./checkbox-panel.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCheckboxPanelElement);
  });
});
