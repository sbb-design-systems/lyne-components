import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbSelectionExpansionPanelElement } from './selection-expansion-panel.component.ts';

import '../checkbox.ts';

describe(`sbb-selection-expansion-panel ssr`, () => {
  let root: SbbSelectionExpansionPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-selection-expansion-panel>
        <sbb-checkbox-panel>Value</sbb-checkbox-panel>
      </sbb-selection-expansion-panel>`,
      {
        modules: ['./selection-expansion-panel.component.js', '../checkbox.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSelectionExpansionPanelElement);
  });
});
