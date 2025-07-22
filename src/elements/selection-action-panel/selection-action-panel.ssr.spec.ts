import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbSelectionActionPanelElement } from './selection-action-panel.component.js';

import '../button/secondary-button.js';
import '../checkbox.js';

describe(`sbb-selection-action-panel ssr`, () => {
  let root: SbbSelectionActionPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-selection-action-panel>
        <sbb-checkbox-panel>Value</sbb-checkbox-panel>
        <sbb-secondary-button size="m" icon-name="arrow-right-small"> </sbb-secondary-button>
      </sbb-selection-action-panel>`,
      {
        modules: [
          './selection-action-panel.component.js',
          '../button/secondary-button.js',
          '../checkbox.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSelectionActionPanelElement);
  });
});
