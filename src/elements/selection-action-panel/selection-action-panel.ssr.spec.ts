import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbSelectionActionPanelElement } from './selection-action-panel.component.ts';

import '../button.ts';
import '../checkbox.ts';
import '../selection-action-panel.ts';

describe(`sbb-selection-action-panel ssr`, () => {
  let root: SbbSelectionActionPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-selection-action-panel>
        <sbb-checkbox-panel>Value</sbb-checkbox-panel>
        <sbb-secondary-button size="m" icon-name="arrow-right-small"> </sbb-secondary-button>
      </sbb-selection-action-panel>`,
      {
        modules: ['../button.ts', '../checkbox.ts', '../selection-action-panel.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSelectionActionPanelElement);
  });
});
