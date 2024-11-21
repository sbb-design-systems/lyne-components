import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbFormErrorElement } from './form-error.js';

describe(`sbb-form-error ssr`, () => {
  let root: SbbFormErrorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-form-error></sbb-form-error>`, {
      modules: ['./form-error.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFormErrorElement);
  });
});
