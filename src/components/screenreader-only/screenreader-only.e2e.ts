import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private';

import { SbbScreenreaderOnlyElement } from './screenreader-only';

describe(`sbb-screenreader-only with ${fixture.name}`, () => {
  let element: SbbScreenreaderOnlyElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-screenreader-only>Hidden text.</sbb-screenreader-only>`, {
      modules: ['./screenreader-only.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbScreenreaderOnlyElement);
  });
});
