import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTagElement } from './tag.component.ts';

import '../../tag.ts';

describe(`sbb-tag ssr`, () => {
  let root: SbbTagElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tag value="tag">Tag</sbb-tag>`, {
      modules: ['../../tag.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTagElement);
  });
});
