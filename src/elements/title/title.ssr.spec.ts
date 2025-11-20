import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTitleElement } from './title.component.ts';

describe(`sbb-title ssr`, () => {
  let root: SbbTitleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-title></sbb-title>`, {
      modules: ['./title.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTitleElement);
  });
});
