import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbSelectionExpansionPanelElement } from './selection-expansion-panel.component.ts';

import '../checkbox-panel.ts';
import '../selection-expansion-panel.ts';

describe(`sbb-selection-expansion-panel ssr`, () => {
  let root: SbbSelectionExpansionPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-selection-expansion-panel>
        <sbb-checkbox-panel>Value</sbb-checkbox-panel>
      </sbb-selection-expansion-panel>`,
      {
        modules: ['../checkbox-panel.ts', '../selection-expansion-panel.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSelectionExpansionPanelElement);
  });
});
