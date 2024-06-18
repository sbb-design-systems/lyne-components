import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../core/testing/private.js';

import { SbbSelectionExpansionPanelElement } from './selection-expansion-panel.js';

import '../checkbox.js';

describe(`sbb-selection-expansion-panel ${fixture.name}`, () => {
  let root: SbbSelectionExpansionPanelElement;

  beforeEach(async () => {
    root = await fixture(
      html`<sbb-selection-expansion-panel>
        <sbb-checkbox-panel>Value</sbb-checkbox-panel>
      </sbb-selection-expansion-panel>`,
      {
        modules: ['./selection-expansion-panel.js', '../checkbox.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSelectionExpansionPanelElement);
  });
});
