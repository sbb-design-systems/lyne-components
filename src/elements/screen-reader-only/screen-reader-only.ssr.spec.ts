import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbScreenReaderOnlyElement } from './screen-reader-only.component.ts';

describe(`sbb-screen-reader-only ssr`, () => {
  let root: SbbScreenReaderOnlyElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-screen-reader-only>Hidden text.</sbb-screen-reader-only>`,
      {
        modules: ['./screen-reader-only.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbScreenReaderOnlyElement);
  });
});
