import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbRadioButtonPanelElement } from './radio-button-panel.js';

describe(`sbb-radio-button-panel ssr`, () => {
  let root: SbbRadioButtonPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-radio-button-panel value="Value">Value label</sbb-radio-button-panel>`,
      {
        modules: ['./radio-button-panel.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbRadioButtonPanelElement);
  });
});
