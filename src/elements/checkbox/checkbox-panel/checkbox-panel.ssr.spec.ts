import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCheckboxPanelElement } from './checkbox-panel.js';

describe(`sbb-checkbox-panel ssr`, () => {
  let root: SbbCheckboxPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-checkbox-panel value="Value">Value label</sbb-checkbox-panel>`,
      {
        modules: ['./checkbox-panel.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCheckboxPanelElement);
  });
});
