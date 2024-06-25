import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbRadioButtonElement } from './radio-button.js';

describe(`sbb-radio-button ssr`, () => {
  let root: SbbRadioButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-radio-button value="Value">Value label</sbb-radio-button>`,
      {
        modules: ['./radio-button.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbRadioButtonElement);
  });
});
