import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbRadioButtonElement } from './radio-button.component.ts';

describe(`sbb-radio-button ssr`, () => {
  it('renders', async () => {
    const root = await ssrHydratedFixture(
      html`<sbb-radio-button value="Value">Value label</sbb-radio-button>`,
      {
        modules: ['./radio-button.component.js'],
      },
    );
    assert.instanceOf(root, SbbRadioButtonElement);
  });

  it('renders checked', async () => {
    const root = await ssrHydratedFixture(
      html`<sbb-radio-button value="Value" checked>Value label</sbb-radio-button>`,
      {
        modules: ['./radio-button.component.js'],
      },
    );
    assert.instanceOf(root, SbbRadioButtonElement);
  });

  it('renders standalone group', async () => {
    const root = await ssrHydratedFixture(
      html`
        <sbb-radio-button name="group" value="value 1">Value 1</sbb-radio-button>
        <sbb-radio-button name="group" value="value 2">Value 2</sbb-radio-button>
        <sbb-radio-button name="group" value="value 3">Value 3</sbb-radio-button>
      `,
      {
        modules: ['./radio-button.component.js'],
      },
    );
    assert.instanceOf(root, SbbRadioButtonElement);
  });
});
