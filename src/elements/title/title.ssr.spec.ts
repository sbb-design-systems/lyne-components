import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTitleElement } from './title.component.ts';

import '../title.ts';

describe(`sbb-title ssr`, () => {
  let root: SbbTitleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-title></sbb-title>`, {
      modules: ['../title.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTitleElement);
  });
});
