import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbDateInputElement } from './date-input.component.ts';

describe(`sbb-date-input ssr`, () => {
  let root: SbbDateInputElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-date-input value="2024-12-11"></sbb-date-input>`, {
      modules: ['./date-input.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDateInputElement);
  });
});
