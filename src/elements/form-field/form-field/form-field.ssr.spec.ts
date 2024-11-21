import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFormFieldElement } from './form-field.js';

describe(`sbb-form-field ssr`, () => {
  let root: SbbFormFieldElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-form-field><input /></sbb-form-field>`, {
      modules: ['./form-field.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFormFieldElement);
  });
});
