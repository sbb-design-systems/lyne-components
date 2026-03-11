import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbErrorElement } from './error.component.ts';

import '../../form-field.ts';

describe(`sbb-error ssr`, () => {
  let root: SbbErrorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-error></sbb-error>`, {
      modules: ['../../form-field.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbErrorElement);
  });
});
