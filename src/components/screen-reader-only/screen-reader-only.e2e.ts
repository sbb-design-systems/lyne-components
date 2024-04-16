import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbScreenReaderOnlyElement } from './screen-reader-only.js';

describe(`sbb-screen-reader-only with ${fixture.name}`, () => {
  let element: SbbScreenReaderOnlyElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-screen-reader-only>Hidden text.</sbb-screen-reader-only>`, {
      modules: ['./screen-reader-only.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbScreenReaderOnlyElement);
  });
});
