import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCheckboxPanelElement } from './checkbox-panel.component.ts';

describe(`sbb-checkbox-panel ssr`, () => {
  let root: SbbCheckboxPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-checkbox-panel value="Value">Value label</sbb-checkbox-panel>`,
      {
        modules: ['./checkbox-panel.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCheckboxPanelElement);
  });
});
