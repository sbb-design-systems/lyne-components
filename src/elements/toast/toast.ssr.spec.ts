import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbToastElement } from './toast.component.js';

describe(`sbb-toast ssr`, () => {
  let root: SbbToastElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-toast></sbb-toast>`, {
      modules: ['./toast.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToastElement);
  });
});
