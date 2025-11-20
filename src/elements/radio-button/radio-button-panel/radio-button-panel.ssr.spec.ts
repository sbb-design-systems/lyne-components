import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbRadioButtonPanelElement } from './radio-button-panel.component.ts';

describe(`sbb-radio-button-panel ssr`, () => {
  it('renders', async () => {
    const root = await ssrHydratedFixture(
      html`<sbb-radio-button-panel value="Value">Value label</sbb-radio-button-panel>`,
      {
        modules: ['./radio-button-panel.component.js'],
      },
    );
    assert.instanceOf(root, SbbRadioButtonPanelElement);
  });

  it('renders checked', async () => {
    const root = await ssrHydratedFixture(
      html`<sbb-radio-button-panel value="Value" checked>Value label</sbb-radio-button-panel>`,
      {
        modules: ['./radio-button-panel.component.js'],
      },
    );
    assert.instanceOf(root, SbbRadioButtonPanelElement);
  });

  it('renders standalone group', async () => {
    const root = await ssrHydratedFixture(
      html`
        <sbb-radio-button-panel name="group" value="value 1">Value 1</sbb-radio-button-panel>
        <sbb-radio-button-panel name="group" value="value 2">Value 2</sbb-radio-button-panel>
        <sbb-radio-button-panel name="group" value="value 3">Value 3</sbb-radio-button-panel>
      `,
      {
        modules: ['./radio-button-panel.component.js'],
      },
    );
    assert.instanceOf(root, SbbRadioButtonPanelElement);
  });
});
